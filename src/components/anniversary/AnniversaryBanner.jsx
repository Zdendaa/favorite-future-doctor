import { useNavigate } from "react-router-dom";
import "./AnniversaryBanner.css";

export default function AnniversaryBanner() {
  const navigate = useNavigate();

  return (
    <div className="anniv-banner">
      <div className="anniv-banner-petals" aria-hidden="true">
        {["🌸", "💗", "✨", "🌷", "💕", "🌸", "✨"].map((emoji, i) => (
          <span
            key={i}
            className={`anniv-banner-petal anniv-banner-petal--${i}`}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="anniv-banner-content">
        <div className="anniv-banner-left">
          <span className="anniv-banner-ring" aria-hidden="true">
            💍
          </span>
          <div className="anniv-banner-text">
            <p className="anniv-banner-label">
              20. června 2025 — 20. června 2026
            </p>
            <p className="anniv-banner-headline">Jeden rok. Ty a já.</p>
          </div>
        </div>

        <button
          className="anniv-banner-btn"
          onClick={() => navigate("/anniversary")}
        >
          Náš příběh
          <span className="anniv-banner-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
