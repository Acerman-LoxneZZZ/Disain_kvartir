import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { site } from "./site.config";
import type { Project } from "./site.config";
import { ProjectDialog } from "./components/ProjectDialog";
import { Comparison } from "./components/Comparison";
import { EnquiryForm } from "./components/EnquiryForm";

const nav = [
  { href: "#projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "Обо мне" },
  { href: "#contact", label: "Контакты" },
];
const nameParts = site.designer.name.split(" ");
const initials = nameParts.map((part) => part[0]).join("");
const heroComma = site.hero.title.indexOf(",");
const heroLead = heroComma >= 0 ? site.hero.title.slice(0, heroComma + 1) : "";
const heroTail = (heroComma >= 0 ? site.hero.title.slice(heroComma + 1) : site.hero.title).trim().split(" ");

function usePageMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const length = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${length > 0 ? Math.min(1, scrollY / length) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("will-reveal");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return progress;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("Все проекты");
  const progress = usePageMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.title = site.seo.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", site.seo.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", site.seo.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", site.seo.description);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        site.demo ? "noindex, nofollow" : "index, follow",
      );
    if (site.seo.url) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = site.seo.url;
      document.head.appendChild(link);
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      meta.content = site.seo.url;
      document.head.appendChild(meta);
      return () => {
        link.remove();
        meta.remove();
      };
    }
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <div className="scroll-progress" ref={progress} aria-hidden="true" />
      <header className="site-header page-width" id="home">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${site.designer.name} — на главную`}
        >
          <span>{site.designer.name}</span>
          <small>Дизайн интерьеров</small>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Обсудить проект <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle icon-button"
          ref={menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Мобильная навигация"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setMenuOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={23} aria-hidden="true" />
              </a>
            ))}
            <span>{site.designer.location}</span>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-top">
            <h1 id="hero-title">
              {heroLead && <span>{heroLead}</span>}
              <span>
                {heroTail.slice(0, -1).join(" ")} <em>{heroTail.at(-1)}</em>
              </span>
            </h1>
            <div className="hero-aside">
              <p>{site.hero.description}</p>
              <a className="text-link" href="#contact">
                Обсудить мой проект{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <picture>
              <source
                srcSet={`${site.hero.image}-800.webp 800w, ${site.hero.image}-1600.webp 1600w`}
                sizes="(max-width: 640px) 100vw, 92vw"
              />
              <img
                src={`${site.hero.image}-1600.webp`}
                alt={site.hero.alt}
                width="1600"
                height="1050"
                fetchPriority="high"
              />
            </picture>
            <div className="hero-photo-caption">
              <span>Тишина. Свет. Ваш характер.</span>
              <a
                href="#projects"
                className="hero-scroll"
                aria-label="Посмотреть избранные проекты"
              >
                <ArrowDown size={22} strokeWidth={1.2} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Индивидуальные интерьеры для жизни</span>
            <span>{site.designer.location}</span>
          </div>
        </section>

        <section
          className="intro-section page-width section-space reveal"
          aria-label="Подход к пространству"
        >
          <span className="intro-mark" aria-hidden="true">
            {initials}
          </span>
          <div>
            <p className="intro-statement">
              Красивое пространство начинается
              <br className="desktop-break" /> с понимания <em>человека.</em>
            </p>
            <p className="intro-description">
              Не следовать готовому образу, а найти ваш собственный. Через
              архитектуру, тактильные материалы и детали, которые делают каждый
              день немного лучше.
            </p>
          </div>
        </section>

        <section
          id="projects"
          className="projects-section page-width section-space"
          aria-labelledby="projects-title"
        >
          <div className="section-heading reveal">
            <h2 id="projects-title">
              Избранные <em>проекты</em>
            </h2>
            <p>
              Разные истории.
              <br />
              Одинаковое внимание к деталям.
            </p>
          </div>
          <div className="projects-toolbar">
            <div className="project-filters" aria-label="Фильтр проектов">
              {["Все проекты", "Квартиры", "Дома"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {site.demo && (
              <span className="demo-label">Демонстрационная подборка</span>
            )}
          </div>
          <div
            className={`projects-grid ${filter !== "Все проекты" ? "is-filtered" : ""}`}
          >
            {site.projects
              .filter(
                (item) =>
                  filter === "Все проекты" ||
                  (filter === "Квартиры"
                    ? item.category === "Квартира"
                    : item.category === "Загородный дом"),
              )
              .map((item) => (
                <button
                  key={item.id}
                  className={`project-card project-${item.id}`}
                  onClick={() => setProject(item)}
                  aria-label={`Открыть проект «${item.title}», ${item.area} м²`}
                >
                  <div className="project-image">
                    <img
                      src={`${item.cover}-800.webp`}
                      srcSet={`${item.cover}-800.webp 800w, ${item.cover}-1600.webp 1600w`}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 60vw"
                      alt={item.alt}
                      loading="lazy"
                      width="1200"
                      height="1400"
                    />
                    <span className="project-open">
                      Смотреть проект{" "}
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="project-caption">
                    <div>
                      <h3>{item.title}</h3>
                      <p>
                        {item.category} · {item.location}
                      </p>
                    </div>
                    <span>
                      {item.area} м²{" "}
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.3}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              ))}
            {filter === "Все проекты" && (
              <div className="project-endnote">
                <ArrowDownRight
                  size={52}
                  strokeWidth={0.8}
                  aria-hidden="true"
                />
                <p>
                  У каждого дома —<br />
                  <em>своя история.</em>
                  <br />
                  Давайте начнём вашу.
                </p>
                <a className="text-link" href="#contact">
                  Обсудить идею <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </section>

        <div className="comparison-wrap">
          <div className="page-width">
            <Comparison />
          </div>
        </div>

        <section
          id="services"
          className="services-section page-width section-space"
          aria-labelledby="services-title"
        >
          <div className="services-intro reveal">
            <h2 id="services-title">
              От первой идеи
              <br />
              <em>до последней детали</em>
            </h2>
            <p>
              Можно пройти весь путь вместе или начать с отдельной задачи.
              Состав работ подбирается под ваш объект и этап, на котором вы
              сейчас.
            </p>
            <a className="text-link" href="#contact">
              Подобрать формат работы{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
          <div className="service-list">
            {site.services.map((item) => (
              <details key={item.title} className="service-item">
                <summary>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <Plus size={21} strokeWidth={1.2} aria-hidden="true" />
                </summary>
                <div className="service-details">
                  {item.details}
                  <a href="#contact">
                    Обсудить услугу{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="process-section page-width section-space"
          aria-labelledby="process-title"
        >
          <div className="section-heading reveal">
            <h2 id="process-title">
              Понятный путь <em>к вашему дому</em>
            </h2>
            <p>
              Диалог и ясность
              <br />
              на каждом этапе.
            </p>
          </div>
          <ol className="process-list">
            {site.steps.map((item, i) => (
              <li key={item.title} className="reveal">
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="about"
          className="about-section page-width section-space"
          aria-labelledby="about-title"
        >
          <div className="portrait-wrap reveal">
            <img
              src={site.designer.portrait}
              alt={
                site.demo
                  ? "Иллюстративный портрет дизайнера в мастерской, созданный с помощью ИИ"
                  : `Дизайнер интерьеров ${site.designer.name}`
              }
              loading="lazy"
              width="800"
              height="1000"
            />
            {site.demo && <span>Иллюстративный портрет · ИИ</span>}
          </div>
          <div className="about-copy reveal">
            <h2 id="about-title">
              {nameParts[0]} <em>{nameParts.slice(1).join(" ")}</em>
            </h2>
            <span className="about-role">{site.designer.role}</span>
            <p className="about-intro">{site.designer.intro}</p>
            <p>{site.designer.bio}</p>
            <p>{site.designer.approach}</p>
            <div className="about-signature">
              <span>{site.designer.signature}</span>
              <ArrowDownRight size={36} strokeWidth={0.8} aria-hidden="true" />
            </div>
            <a className="text-link" href="#contact">
              Познакомиться и обсудить проект{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="faq-section page-width section-space"
          aria-labelledby="faq-title"
        >
          <div className="faq-intro reveal">
            <h2 id="faq-title">
              Прежде чем
              <br />
              <em>мы начнём</em>
            </h2>
            <p>
              Ответы на вопросы,
              <br />
              которые помогают сделать первый шаг.
            </p>
          </div>
          <div className="faq-list">
            {site.faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <Plus size={20} strokeWidth={1.2} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="page-width contact-grid">
            <div className="contact-copy reveal">
              <h2 id="contact-title">
                Каким будет
                <br />
                <em>ваш дом?</em>
              </h2>
              <p>
                Расскажите немного о себе и пространстве, которое вы хотите
                создать. Начнём с разговора — без готовых решений и лишних
                обязательств.
              </p>
              <ArrowDownRight
                className="contact-arrow"
                size={76}
                strokeWidth={0.7}
                aria-hidden="true"
              />
              <div className="direct-contacts">
                {site.contacts.email && (
                  <a href={`mailto:${site.contacts.email}`}>
                    {site.contacts.email}
                    <ArrowUpRight size={17} />
                  </a>
                )}
                {site.contacts.phone && (
                  <a href={`tel:${site.contacts.phone}`}>
                    {site.contacts.phoneLabel || site.contacts.phone}
                  </a>
                )}
                {site.contacts.telegram && (
                  <a
                    href={site.contacts.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Написать в Telegram
                    <ArrowUpRight size={17} />
                  </a>
                )}
                {!site.contacts.email &&
                  !site.contacts.phone &&
                  !site.contacts.telegram && (
                    <span>Прямые контакты появятся после настройки сайта.</span>
                  )}
              </div>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <div className="footer-top">
          <a className="wordmark" href="#home">
            <span>{site.designer.name}</span>
            <small>Пространства для жизни</small>
          </a>
          <p>{site.designer.location}</p>
          <a className="back-to-top" href="#home">
            Наверх <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.designer.name}
          </span>
          {site.demo && (
            <p>
              Демонстрационный сайт. Имя, проекты и площади — примеры для
              замены. Фотографии интерьеров —{" "}
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
              .
            </p>
          )}
        </div>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </>
  );
}
