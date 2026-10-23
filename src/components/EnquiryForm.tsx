import { useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { site } from "../site.config";
import { sendEnquiry, validateEnquiry } from "../lib/enquiry";
import type { Enquiry, FieldErrors, SubmitResult } from "../lib/enquiry";

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>({
    name: "",
    contact: "",
    propertyType: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof Enquiry, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (result) setResult(null);
  }
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validateEnquiry(values, site.enquiry.propertyTypes);
    setErrors(nextErrors);
    setResult(null);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setBusy(true);
    const response = await sendEnquiry(
      values,
      site.enquiry.endpoint,
      site.enquiry.timeoutMs,
    );
    setResult(response);
    setBusy(false);
    if (response.state === "success")
      setValues({ name: "", contact: "", propertyType: "" });
  }
  return (
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={submit}
      noValidate
      aria-busy={busy}
    >
      <div className="form-field">
        <label htmlFor="name">Как вас зовут</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Ваше имя"
          maxLength={80}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={busy}
        />
        {errors.name && (
          <span className="field-error" id="name-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="contact">Как с вами связаться</label>
        <input
          id="contact"
          name="contact"
          type="text"
          autoComplete="off"
          placeholder="Телефон, email или @telegram"
          maxLength={150}
          value={values.contact}
          onChange={(e) => update("contact", e.target.value)}
          required
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "contact-error" : undefined}
          disabled={busy}
        />
        {errors.contact && (
          <span className="field-error" id="contact-error">
            {errors.contact}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="propertyType">Ваш объект</label>
        <select
          id="propertyType"
          name="propertyType"
          value={values.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
          required
          aria-invalid={!!errors.propertyType}
          aria-describedby={errors.propertyType ? "type-error" : undefined}
          disabled={busy}
        >
          <option value="" disabled>
            Выберите тип объекта
          </option>
          {site.enquiry.propertyTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        {errors.propertyType && (
          <span className="field-error" id="type-error">
            {errors.propertyType}
          </span>
        )}
      </div>
      {!site.enquiry.endpoint && (
        <p className="form-availability">
          Приём заявок пока не подключён. Данные из этой формы не отправляются.
        </p>
      )}
      <button className="button button-dark" type="submit" disabled={busy}>
        {busy ? "Отправляю…" : "Обсудить мой проект"}
        {busy ? (
          <LoaderCircle className="spinner" size={19} aria-hidden="true" />
        ) : (
          <ArrowUpRight size={20} aria-hidden="true" />
        )}
      </button>
      {result && (
        <p
          className={`form-result result-${result.state}`}
          role={result.state === "error" ? "alert" : "status"}
        >
          {result.message}
        </p>
      )}
      {site.enquiry.privacyUrl ? (
        <p className="form-legal">
          Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на
          заявку в соответствии с{" "}
          <a
            href={site.enquiry.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            политикой конфиденциальности
          </a>
          .
        </p>
      ) : (
        <p className="form-legal">
          Перед запуском владелец сайта должен добавить политику обработки
          персональных данных.
        </p>
      )}
    </form>
  );
}
