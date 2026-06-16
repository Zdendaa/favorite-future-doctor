import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "./AnniversaryPopup.css";

const ANNIVERSARY_DATE = new Date(2026, 5, 20);

function isAnniversaryOrAfter(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const anniversary = new Date(
    ANNIVERSARY_DATE.getFullYear(),
    ANNIVERSARY_DATE.getMonth(),
    ANNIVERSARY_DATE.getDate(),
  );
  return today.getTime() == anniversary.getTime();
}

export default function AnniversaryPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const visible = isAnniversaryOrAfter() && isOpen;

  const handleClose = () => setIsOpen(false);
  const handleDiscover = () => {
    setIsOpen(false);
    navigate("/anniversary");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!visible) return null;

  return createPortal(
    <div
      className="ap-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Výročí"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="ap-card">
        <PetalLayer />

        <button className="ap-close" onClick={handleClose} aria-label="Zavřít">
          ✕
        </button>

        <div className="ap-ring" aria-hidden="true">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="rg1"
                x1="10"
                y1="20"
                x2="70"
                y2="75"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f7c0d0" />
                <stop offset="50%" stopColor="#e8628a" />
                <stop offset="100%" stopColor="#c0185a" />
              </linearGradient>
              <radialGradient id="sg1" cx="38%" cy="33%" r="60%">
                <stop offset="0%" stopColor="#e8f4ff" />
                <stop offset="40%" stopColor="#b8d9f8" />
                <stop offset="100%" stopColor="#4a9bdc" />
              </radialGradient>
            </defs>
            <circle
              cx="40"
              cy="48"
              r="22"
              stroke="url(#rg1)"
              strokeWidth="6"
              fill="none"
            />
            <ellipse cx="40" cy="26" rx="8" ry="8" fill="url(#sg1)" />
            <ellipse
              cx="40"
              cy="24.5"
              rx="4"
              ry="3"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M33 31 Q37 35 40 33 Q43 35 47 31"
              stroke="url(#rg1)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="ap-eyebrow">365 dní spolu</p>

        <h2 className="ap-title">
          Šťastné výročí,
          <br />
          <em>Broučku</em> 💖
        </h2>

        <p className="ap-subtitle">
          Mám pro tebe něco připravené —<br />
          malý výlet našim společným rokem.
        </p>

        <button className="ap-cta" onClick={handleDiscover}>
          Chci ti něco ukázat →
        </button>
      </div>
    </div>,
    document.body,
  );
}

const PETALS = ["🌸", "💗", "✨", "🌷", "💕"];

function PetalLayer() {
  const [petals] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      emoji: PETALS[i % PETALS.length],
    })),
  );

  return (
    <div className="ap-petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="ap-petal"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
