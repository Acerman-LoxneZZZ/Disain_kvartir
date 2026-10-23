export type Enquiry = { name: string; contact: string; propertyType: string };
export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(
  values: Enquiry,
  types: readonly string[],
): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const contact = values.contact.trim();
  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) {
    errors.name = "Введите имя: от 2 до 80 символов.";
  }
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(contact);
  const phone =
    /^[+\d\s().-]+$/.test(contact) &&
    contact.replace(/\D/g, "").length >= 10 &&
    contact.replace(/\D/g, "").length <= 15;
  const telegram =
    /^@[a-z\d_]{5,32}$/i.test(contact) ||
    /^https:\/\/t\.me\/[a-z\d_]{5,32}\/?$/i.test(contact);
  if (contact.length > 150 || !(email || phone || telegram)) {
    errors.contact =
      "Укажите телефон с кодом страны, email или @ник в Telegram.";
  }
  if (!types.includes(values.propertyType))
    errors.propertyType = "Выберите тип объекта.";
  return errors;
}

export type SubmitResult = {
  state: "success" | "unavailable" | "error";
  message: string;
};

export async function sendEnquiry(
  values: Enquiry,
  endpoint: string,
  timeoutMs = 15000,
  request: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint.trim())
    return {
      state: "unavailable",
      message:
        "Приём заявок пока не подключён. Ваши данные никуда не отправлены. Владелец сайта должен добавить обработчик формы в настройках.",
    };
  if (!/^https:\/\//i.test(endpoint) && !/^\/(?!\/)/.test(endpoint)) {
    return {
      state: "error",
      message: "Адрес обработчика настроен неверно. Данные не отправлены.",
    };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await request(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name.trim(),
        contact: values.contact.trim(),
        propertyType: values.propertyType,
        source: "interior-website",
      }),
      signal: controller.signal,
      credentials: "omit",
    });
    if (!response.ok) throw new Error("http");
    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("ok" in data) ||
      data.ok !== true
    )
      throw new Error("unconfirmed");
    return {
      state: "success",
      message:
        "Заявка принята. Спасибо! Я свяжусь с вами по указанному контакту, чтобы обсудить проект.",
    };
  } catch {
    return {
      state: "error",
      message: controller.signal.aborted
        ? "Сервер не ответил вовремя. Данные сохранены в форме — попробуйте ещё раз или используйте прямой контакт."
        : "Не удалось подтвердить приём заявки. Данные сохранены в форме — попробуйте ещё раз или используйте прямой контакт.",
    };
  } finally {
    clearTimeout(timer);
  }
}
