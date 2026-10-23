import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { site } from "../site.config";

export function Comparison() {
  const [position, setPosition] = useState(48);
  const [titleStart, ...titleEnd] = site.comparison.title.split("—");
  return (
    <section
      className="comparison-section section-space"
      aria-labelledby="comparison-title"
    >
      <div className="comparison-intro reveal">
        <h2 id="comparison-title">
          {titleStart.trim()}{titleEnd.length > 0 && <> —<br /><em>{titleEnd.join("—").trim()}</em></>}
        </h2>
        <p>{site.comparison.text}</p>
      </div>
      <div
        className="comparison-frame reveal"
        style={{ "--position": `${position}%` } as React.CSSProperties}
      >
        <img
          className="comparison-image"
          src={site.comparison.after}
          alt="После: обустроенная гостиная с мягкой мебелью, растениями и тёплой отделкой"
          loading="lazy"
          width="1600"
          height="1200"
        />
        <div className="comparison-before">
          <img
            className="comparison-image"
            src={site.comparison.before}
            alt="До: иллюстрация той же комнаты без отделки и мебели"
            loading="lazy"
            width="1600"
            height="1200"
          />
        </div>
        <span className="comparison-label label-before" aria-hidden="true">
          До
        </span>
        <span className="comparison-label label-after" aria-hidden="true">
          После
        </span>
        <div className="comparison-divider" aria-hidden="true">
          <span>
            <ChevronsLeftRight size={24} strokeWidth={1.4} />
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Сравнение до и после"
          aria-valuetext={`До: ${position}%, после: ${100 - position}%`}
          aria-describedby="comparison-help comparison-caption"
        />
      </div>
      <div className="comparison-footnote">
        <p id="comparison-help">
          Перемещайте разделитель или используйте стрелки на клавиатуре
        </p>
        <p id="comparison-caption">{site.comparison.caption}</p>
      </div>
    </section>
  );
}
