import { useState } from "react";
import "./OurStoryPage.css";

import prvniRandePetrin from "/videos/prvniRandePetrin.mp4";
import jezek from "/videos/jezek.mp4";
import ploskoviceSkok from "/videos/ploskoviceSkok.mp4";
import triMesice from "/videos/triMesice.mp4";
import firstPhoto from "../assets/photos/firstPhoto.jpg";
import litomericeLeave from "../assets/photos/litomericeLeave.jpg";
import cucflek from "../assets/photos/cucflek.jpg";
import chata from "../assets/photos/chata.jpg";
import nemeckoBoty from "../assets/photos/nemeckoBoty.jpg";
import hradStrekov from "../assets/photos/hradStrekov.jpg";
import prvniMaj from "../assets/photos/prvniMaj.jpg";
import kajaMaturitak from "../assets/photos/kajaMaturitak.jpg";
import oblibena from "../assets/photos/oblibena.jpg";
import pulRoku from "../assets/photos/pulRoku.jpg";

const CHAPTERS = [
  {
    id: 1,
    label: "Jak to začalo",
    photos: [
      {
        src: prvniRandePetrin,
        type: "video",
        caption:
          "První rande — Petřín, Praha. Oba nervózní a ještě jsme nevěděli, jak to dopadne.",
      },
      {
        src: jezek,
        type: "video",
        caption: "Druhé rande — Stromovka, Praha. A ochočený ježek.",
      },
      {
        src: firstPhoto,
        caption: "Litoměřice, třetí rande — naše první společná fotka.",
      },
      {
        src: litomericeLeave,
        caption:
          "Smála ses, ale oba jsme věděli — za chvíli odjíždíš domů, měsíc tě neuvidím. A jestli vůbec ještě někdy.",
      },
      {
        src: cucflek,
        caption:
          "A nakonec jsme to zvládli. Měsíc čekání — a tvůj první cucflek jako odměna. 😜",
      },
    ],
  },
  {
    id: 2,
    label: "Spolu na cestách",
    photos: [
      {
        src: chata,
        caption: "Poprvé na chatě. Jen ty a já.",
      },
      {
        src: ploskoviceSkok,
        type: "video",
        caption:
          "Zámek Ploskovice — a jak jinak, středem pozornosti byla Kája. 😄",
      },
      {
        src: nemeckoBoty,
        caption:
          "Německo. Perfektní nápad vylézt v dešti na kopec plný bláta, ale nelituju.",
      },
      {
        src: hradStrekov,
        caption:
          "Hrad Střekov, Ústí nad Labem. Občasný boj s vosami, ale přežili jsme. 💪",
      },
    ],
  },
  {
    id: 3,
    label: "Hezké momenty",
    photos: [
      {
        src: prvniMaj,
        caption: "První máj — stihli jsme ho přesně včas. 💋",
      },
      {
        src: kajaMaturitak,
        caption: "Po plese. Tuhle fotku mám fakt rád.",
      },
    ],
  },
  {
    id: 4,
    label: "Moje nejoblíbenější",
    photos: [
      {
        src: oblibena,
        caption:
          "Tuhle fotku mám nejradši. Když se mi po tobě stýská, stačí se na ní podívat.",
      },
    ],
  },
  {
    id: 5,
    label: "Výročí",
    photos: [
      {
        src: triMesice,
        type: "video",
        caption:
          "Tři měsíce spolu — Vinobranní v Litoměřicích. Hudba, víno, ty.",
      },
      {
        src: pulRoku,
        caption:
          "Půl roku. Ty sis dala pořádný steak, já burger. A bylo nám skvěle.",
      },
      {
        src: null,
        caption: "Jeden rok. A to nejlepší teprve přijde.",
        placeholder:
          "Je potřeba zaplnit i tohle místo nějakou hezkou vzpomínkou. 😉",
      },
    ],
  },
];

// ─── HLAVNÍ KOMPONENTA ────────────────────────────────────────────────────────

export default function AnniversaryPage() {
  const [lightbox, setLightbox] = useState(null); // { src, caption }

  return (
    <main className="anp-root">
      {/* HERO */}
      <section className="anp-hero">
        <div className="anp-hero-bg" aria-hidden="true" />
        <p className="anp-hero-eyebrow">20. června 2025 — 20. června 2026</p>
        <h1 className="anp-hero-title">
          Jeden rok.
          <br />
          <em>Ty a já.</em>
        </h1>
        <p className="anp-hero-sub">
          Kájo, tohle je náš rok spolu.
          <br />
          Dal jsem dohromady pár momentů, které pro mě hodně znamenají.
        </p>
        <div className="anp-hero-divider" aria-hidden="true" />
      </section>

      {/* KAPITOLY S FOTOGALERIÍ */}
      {CHAPTERS.map((ch) => (
        <section key={ch.id} className="anp-chapter">
          <header className="anp-chapter-header">
            <span className="anp-chapter-num">0{ch.id}</span>
            <h2 className="anp-chapter-title">{ch.label}</h2>
          </header>

          <div className="anp-grid">
            {ch.photos.map((photo, idx) => (
              <PhotoCard
                key={idx}
                photo={photo}
                onClick={() => photo.src && setLightbox(photo)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* PROMISE RING SEKCE */}
      <section className="anp-promise">
        <div className="anp-promise-ring" aria-hidden="true">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="prg"
                x1="20"
                y1="30"
                x2="100"
                y2="105"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#f7c0d0" />
                <stop offset="50%" stopColor="#e8628a" />
                <stop offset="100%" stopColor="#c0185a" />
              </linearGradient>
              <radialGradient id="psg" cx="38%" cy="33%" r="60%">
                <stop offset="0%" stopColor="#e8f4ff" />
                <stop offset="40%" stopColor="#b8d9f8" />
                <stop offset="100%" stopColor="#4a9bdc" />
              </radialGradient>
            </defs>
            <circle
              cx="60"
              cy="72"
              r="34"
              stroke="url(#prg)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="72"
              r="28"
              stroke="url(#prg)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <ellipse cx="60" cy="38" rx="12" ry="12" fill="url(#psg)" />
            <ellipse
              cx="60"
              cy="35.5"
              rx="6"
              ry="4.5"
              fill="white"
              opacity="0.55"
            />
            <ellipse
              cx="62"
              cy="34"
              rx="3"
              ry="2.5"
              fill="white"
              opacity="0.75"
            />
            <path
              d="M49 47 Q55 53 60 50 Q65 53 71 47"
              stroke="url(#prg)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="anp-promise-title">Promise ring</h2>
        <p className="anp-promise-text">
          Jsem tady pro tebe, nikam nejdu a chci být součástí tvého příběhu
          ještě moc dlouho. Nos ho jako připomínku, že na tebe myslím. Každý
          den. Nejen dnes.
        </p>
        <p className="anp-promise-sign">Tvůj Zdenda 💍</p>
      </section>

      {/* FOOTER */}
      <footer className="anp-footer">
        <p>Miluju tě, Lásko. 💖</p>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="anp-lightbox"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="anp-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Zavřít"
          >
            ✕
          </button>

          {lightbox.type === "video" ? (
            <video
              src={lightbox.src}
              controls
              autoPlay
              className="anp-lightbox-video"
            />
          ) : (
            <img src={lightbox.src} alt={lightbox.caption} />
          )}

          {lightbox.caption && (
            <p className="anp-lightbox-caption">{lightbox.caption}</p>
          )}
        </div>
      )}
    </main>
  );
}

// ─── PHOTO / VIDEO CARD ───────────────────────────────────────────────────────

function PhotoCard({ photo, onClick }) {
  const isVideo = photo.type === "video";

  return (
    <div
      className={`anp-photo-card ${photo.src ? "anp-photo-card--clickable" : ""}`}
      onClick={onClick}
    >
      <div className="anp-photo-img-wrap">
        {photo.src ? (
          isVideo ? (
            <div className="anp-video-thumb">
              <video
                src={photo.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="anp-video-play-icon" aria-hidden="true">
                ▶
              </span>
            </div>
          ) : (
            <img src={photo.src} alt={photo.caption} loading="lazy" />
          )
        ) : (
          <div className="anp-photo-placeholder">
            <span>{isVideo ? "🎥" : "📷"}</span>
            <small>{photo.placeholder ?? (isVideo ? "video" : "fotku")}</small>
          </div>
        )}
      </div>
      {photo.caption && <p className="anp-photo-caption">{photo.caption}</p>}
    </div>
  );
}
