import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "../site.config";
import { site } from "../site.config";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!project) return;
    const element = dialog.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    setIndex(0);
    element.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = oldOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project]);
  const move = (direction: number) =>
    project &&
    setIndex(
      (current) =>
        (current + direction + project.gallery.length) % project.gallery.length,
    );
  const image = project?.gallery[index] ?? project?.gallery[0];
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
      }}
    >
      {project && (
        <div className="dialog-content">
          <div className="dialog-topline">
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Закрыть проект"
              autoFocus
            >
              <X size={23} strokeWidth={1.4} />
            </button>
          </div>
          <div className="dialog-heading">
            <h2 id="project-title">{project.title}</h2>
            <span>
              {project.location} · {project.area} м² · {project.year}
            </span>
          </div>
          <div className="gallery-image">
            {image && (
              <img
                key={image.image}
                src={`${image.image}-1600.webp`}
                alt={image.alt}
                width="1600"
                height="1100"
              />
            )}
            <div className="gallery-controls">
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label="Предыдущая фотография"
              >
                <ArrowLeft size={20} />
              </button>
              <span aria-live="polite" aria-atomic="true">
                {index + 1} / {project.gallery.length}
              </span>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label="Следующая фотография"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="gallery-thumbnails" aria-label="Выбор фотографии">
            {project.gallery.map((item, i) => (
              <button
                key={item.image}
                className={index === i ? "active" : ""}
                onClick={() => setIndex(i)}
                aria-label={`Фотография ${i + 1}: ${item.alt}`}
                aria-pressed={index === i}
              >
                <img
                  src={`${item.image}-800.webp`}
                  alt=""
                  width="100"
                  height="68"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <div className="project-story">
            <div>
              <h3>Задача</h3>
              <p>{project.task}</p>
              <p>{project.description}</p>
            </div>
            <div>
              <h3>Состав работ</h3>
              <ul>
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {site.demo && (
            <p className="dialog-note">
              Иллюстративный кейс: фотографии, описание и площадь показывают
              структуру портфолио и не подтверждают авторство дизайнера.
            </p>
          )}
          <a className="text-link" href="#contact" onClick={onClose}>
            Обсудить похожий проект{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      )}
    </dialog>
  );
}
