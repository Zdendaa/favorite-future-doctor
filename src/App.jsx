import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const RELATIONSHIP_START = new Date(2025, 5, 20);

function getMonthsTogether(startDate, now = new Date()) {
  let months = (now.getFullYear() - startDate.getFullYear()) * 12;
  months += now.getMonth() - startDate.getMonth();

  if (now.getDate() < startDate.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
}

function getCzechMonthWord(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "měsíc";
  }

  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
    return "měsíce";
  }

  return "měsíců";
}

const sections = [
  { id: "doktorka", label: "👩‍⚕️ Doktorka" },
  { id: "miluju", label: "💌 Miluju tě" },
  { id: "obejmout", label: "🤗 Obejmout" },
  { id: "duvody", label: "⭐ Proč tě miluju" },
  { id: "motivace", label: "🎓 Věřím ti" },
];

const doctorCompliments = [
  "Jednou budeš doktorka, na kterou lidi nikdy nezapomenou.",
  "Máš drive, co většina lidí ani nechápe.",
  "To, že se učíš do noci, není normální… ale přesně to z tebe udělá nejlepší doktorku.",
  "Jsi ten typ, co nejen že to vystuduje… ale ještě v tom bude nejlepší.",
  "Jednou si pacienti řeknou, že měli štěstí, že narazili právě na tebe.",
  "Máš skvělou kombinaci síly a jemnosti, přesně to, co z tebe udělá výjimečnou doktorku.",
];

const rotatingLoveLines = [
  "Miluju ten tvůj smích, i když se směješ zrovna mně 😅",
  "Miluju, jak se nikdy nevzdáváš.",
  "Miluju tvoje velký oříškový kukadla.",
  "Miluju, jak si jdeš za svým, i když to znamená učit se do noci.",
  "Miluju, jak se mnou sdílíš úplně všechno.",
  "Miluju, že i když jsi unavená, stejně si na mě uděláš čas.",
  "Občas si říkám, jaký mám štěstí, že tě mám.",
];

const nicknames = [
  {
    title: "Česnek 🧄",
    reason: "Protože miluješ česnek a tvoje jídla jsou díky němu úplně boží.",
  },
  {
    title: "Oříšek 👀",
    reason: "Protože máš nádherný velký oříškový kukadla.",
  },
  {
    title: "Kudlanka Kája 💚",
    reason: "Protože jsi crazy a královna chaosu",
  },
  {
    title: "Láska 💖",
    reason: "Protože jsi moje největší láska.",
  },
  {
    title: "Zlato ✨",
    reason: "Protože jseš pro mě poklad každej den.",
  },
];

const reasons = [
  "Protože jseš laskavá i ve dnech, kdy je to těžký.",
  "Protože vedle tebe se cejtím doma.",
  "Protože se mnou sdílíš radost i starosti.",
  "Protože máš sílu, co mě inspiruje.",
  "Protože jseš nádherná uvnitř i navenek.",
  "Protože jsi moje zlatíčko.",
  "Protože tě miluju celým srdcem.",
];

const motivationSteps = [
  "Od první třídy máš samý jedničky, to je tvoje super síla.",
  "Máš plán, disciplínu a silnou hlavu.",
  "Každej den se posouváš o kus dál.",
  "Maturitu dáš levou zadní.",
  "Přijímačky zvládneš stejně jako všechno ostatní.",
  "Budeš přesně tam, kde chceš být.",
];

function App() {
  const shellRef = useRef(null);
  const [activeSection, setActiveSection] = useState("doktorka");
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [loveIndex, setLoveIndex] = useState(0);
  const [heartRain, setHeartRain] = useState(0);
  const [hugPower, setHugPower] = useState(0);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [motivationLevel, setMotivationLevel] = useState(0);
  const [nicknameIndex, setNicknameIndex] = useState(0);
  const [clickBursts, setClickBursts] = useState([]);

  const doctorSkills = useMemo(
    () => [
      { name: "Empatie", value: 91 },
      { name: "Odvaha", value: 97 },
      { name: "Chytrá hlavička", value: 99 },
      { name: "Něžnost", value: 95 },
    ],
    [],
  );

  const monthsTogether = useMemo(
    () => getMonthsTogether(RELATIONSHIP_START),
    [],
  );
  const monthWord = getCzechMonthWord(monthsTogether);

  const nextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % doctorCompliments.length);
  };

  const nextLoveLine = () => {
    setLoveIndex((prev) => (prev + 1) % rotatingLoveLines.length);
    setHeartRain((prev) => prev + 1);
  };

  const sendHug = () => {
    setHugPower((prev) => Math.min(prev + 1, 8));
  };

  const nextReason = () => {
    setReasonIndex((prev) => (prev + 1) % reasons.length);
  };

  const boostMotivation = () => {
    setMotivationLevel((prev) =>
      Math.min(prev + 1, motivationSteps.length - 1),
    );
  };

  const nextNickname = () => {
    setNicknameIndex((prev) => (prev + 1) % nicknames.length);
  };

  const createBurst = (event, emoji = "💖") => {
    const shellBounds = shellRef.current?.getBoundingClientRect();
    const x = shellBounds ? event.clientX - shellBounds.left : 0;
    const y = shellBounds ? event.clientY - shellBounds.top : 0;
    const symbols = [emoji, "💖", "💗", "✨", "💕", "💘"];

    const particles = Array.from({ length: 12 }, (_, index) => {
      const id = `${Date.now()}-${Math.random()}-${index}`;
      const angle = (Math.PI * 2 * index) / 12;
      const distance = 55 + Math.random() * 95;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - (25 + Math.random() * 35);

      return {
        id,
        x,
        y,
        emoji: symbols[Math.floor(Math.random() * symbols.length)],
        dx,
        dy,
        size: 1.1 + Math.random() * 1.2,
        rotation: -20 + Math.random() * 40,
        duration: 1000 + Math.random() * 450,
      };
    });

    setClickBursts((prev) => [...prev, ...particles]);
    setTimeout(() => {
      const removeIds = new Set(particles.map((particle) => particle.id));
      setClickBursts((prev) => prev.filter((item) => !removeIds.has(item.id)));
    }, 1700);
  };

  useEffect(() => {
    if (activeSection !== "miluju") {
      return undefined;
    }

    const timer = setInterval(() => {
      setLoveIndex((prev) => (prev + 1) % rotatingLoveLines.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [activeSection]);

  return (
    <main ref={shellRef} className="app-shell">
      <div className="burst-layer" aria-hidden="true">
        {clickBursts.map((burst) => (
          <span
            key={burst.id}
            className="click-burst"
            style={{
              left: `${burst.x}px`,
              top: `${burst.y}px`,
              "--dx": `${burst.dx}px`,
              "--dy": `${burst.dy}px`,
              "--size": `${burst.size}rem`,
              "--rot": `${burst.rotation}deg`,
              "--dur": `${burst.duration}ms`,
            }}
            aria-hidden="true"
          >
            {burst.emoji}
          </span>
        ))}
      </div>

      <header className="hero">
        <p className="eyebrow">Jen pro moji nejoblíbenější holku ✨</p>
        <h1>Ahoj, zlatíčko</h1>

        <button className="main-love-btn" onClick={nextLoveLine}>
          Jseš moje zlatíčko! 💞
        </button>

        <div key={heartRain} className="heart-rain" aria-hidden="true">
          <span>💗</span>
          <span>💕</span>
          <span>💓</span>
          <span>💞</span>
          <span>💘</span>
        </div>

        <div className="infinity-love" aria-label="Nekonečná láska">
          <span className="infinity-symbol">∞</span>
          <span>{`${monthsTogether} ${monthWord} spolu 💗`}</span>
        </div>

        <div className="nickname-card">
          <p className="nickname-title">
            Dnešní přezdívka pro tebe: {nicknames[nicknameIndex].title}
          </p>
          <p className="nickname-reason">{nicknames[nicknameIndex].reason}</p>
          <button
            className="ghost-btn nickname-btn"
            onClick={(event) => {
              createBurst(event, "💫");
              nextNickname();
            }}
          >
            Hoď další přezdívku
          </button>
        </div>

        <nav className="section-nav" aria-label="Sekce appky">
          {sections.map((section) => (
            <button
              key={section.id}
              className={
                section.id === activeSection ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="content-card">
        {activeSection === "doktorka" && (
          <div className="panel slide-up">
            <h2>Budeš skvělá doktorka 👩‍⚕️</h2>
            <p className="panel-text">
              Klikni na doktorku a vyskočí další pochvala.
            </p>

            <button
              className="avatar-btn"
              onClick={(event) => {
                createBurst(event, "✨");
                nextCompliment();
              }}
            >
              👩‍⚕️
            </button>

            <p className="highlight-line">
              {doctorCompliments[complimentIndex]}
            </p>

            <div className="skills">
              {doctorSkills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="skill-meta">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "miluju" && (
          <div className="panel slide-up">
            <h2>Miluju tě 💌</h2>
            <p className="panel-text">Každý klik pošle další vlnu lásky.</p>

            <p className="highlight-line">{rotatingLoveLines[loveIndex]}</p>

            <button
              className="action-btn"
              onClick={(event) => {
                createBurst(event, "💗");
                nextLoveLine();
              }}
            >
              Poslat další dávku lásky
            </button>

            <div className="confetti-line" aria-hidden="true">
              <span>🎉</span>
              <span>💖</span>
              <span>🎉</span>
              <span>💖</span>
              <span>🎉</span>
            </div>
          </div>
        )}

        {activeSection === "obejmout" && (
          <div className="panel slide-up">
            <h2>Virtuální objetí 🤗</h2>
            <p className="panel-text">
              Mačkej tlačítko a objetí bude čím dál silnější.
            </p>

            <div className="hug-meter">
              <div
                className="hug-fill"
                style={{ width: `${hugPower * 12.5}%` }}
              ></div>
            </div>

            <p
              className="hug-face"
              style={{ transform: `scale(${1 + hugPower * 0.04})` }}
            >
              🫂
            </p>

            <button
              className="action-btn"
              onClick={(event) => {
                createBurst(event, "🤍");
                sendHug();
              }}
            >
              Obejmi mě pořádně
            </button>

            <button className="ghost-btn" onClick={() => setHugPower(0)}>
              Reset objetí
            </button>
          </div>
        )}

        {activeSection === "duvody" && (
          <div className="panel slide-up">
            <h2>7 důvodů, proč tě miluju ⭐</h2>
            <p className="panel-text">
              Proklikej si všechny důvody, proč jsi top.
            </p>

            <p className="highlight-line">{reasons[reasonIndex]}</p>

            <button
              className="action-btn"
              onClick={(event) => {
                createBurst(event, "⭐");
                nextReason();
              }}
            >
              Hoď další důvod
            </button>

            <div className="reason-dots" aria-hidden="true">
              {reasons.map((_, index) => (
                <span
                  key={index}
                  className={index === reasonIndex ? "dot active" : "dot"}
                ></span>
              ))}
            </div>
          </div>
        )}

        {activeSection === "motivace" && (
          <div className="panel slide-up">
            <h2>Maturitu i přijímačky zvládneš 🎓</h2>
            <p className="panel-text">
              Jseš extrémně chytrá a od první třídy máš samý jedničky. Klikni
              pro další dávku motivace.
            </p>

            <p className="highlight-line">{motivationSteps[motivationLevel]}</p>

            <button
              className="action-btn"
              onClick={(event) => {
                createBurst(event, "🎓");
                boostMotivation();
              }}
            >
              Přihodit motivaci
            </button>

            <ul className="motivation-list">
              {motivationSteps.map((step, index) => (
                <li
                  key={step}
                  className={index <= motivationLevel ? "done" : ""}
                >
                  <span>{index <= motivationLevel ? "✅" : "⬜"}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="app-footer">
        Udělaný s radostí pro moji nejoblíbenější holku 💫
      </footer>
    </main>
  );
}

export default App;
