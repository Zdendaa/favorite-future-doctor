import { useMemo, useState } from 'react'
import './App.css'

const sections = [
  { id: 'doktorka', label: '👩‍⚕️ Doktorka' },
  { id: 'miluju', label: '💌 Miluju tě' },
  { id: 'obejmout', label: '🤗 Obejmout' },
  { id: 'duvody', label: '⭐ Proč tě miluju' },
]

const doctorCompliments = [
  'Budeš doktorka, na kterou budou pacienti vzpomínat s úsměvem.',
  'Máš obrovské srdce a přesně to dělá skvělou doktorku.',
  'Tvoje trpělivost je vzácná superschopnost.',
  'Umíš uklidnit i jen tím, že jsi nablízku.',
]

const rotatingLoveLines = [
  'Miluju tvůj smích.',
  'Miluju, jak se nikdy nevzdáváš.',
  'Miluju, jak krásně záříš.',
  'Miluju naše malé každodenní chvíle.',
  'Miluju tě dnes, zítra i pořád.',
]

const reasons = [
  'Protože jsi laskavá i ve dnech, kdy je to těžké.',
  'Protože se vedle tebe cítím doma.',
  'Protože se mnou sdílíš radost i starosti.',
  'Protože máš sílu, která mě inspiruje.',
  'Protože jsi nádherná uvnitř i navenek.',
  'Protože jsi moje zlatíčko.',
  'Protože tě miluju celým srdcem.',
]

function App() {
  const [activeSection, setActiveSection] = useState('doktorka')
  const [complimentIndex, setComplimentIndex] = useState(0)
  const [loveIndex, setLoveIndex] = useState(0)
  const [heartRain, setHeartRain] = useState(0)
  const [hugPower, setHugPower] = useState(0)
  const [reasonIndex, setReasonIndex] = useState(0)

  const doctorSkills = useMemo(
    () => [
      { name: 'Empatie', value: 96 },
      { name: 'Odvaha', value: 91 },
      { name: 'Chytrá hlavička', value: 94 },
      { name: 'Něžnost', value: 98 },
    ],
    [],
  )

  const nextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % doctorCompliments.length)
  }

  const nextLoveLine = () => {
    setLoveIndex((prev) => (prev + 1) % rotatingLoveLines.length)
    setHeartRain((prev) => prev + 1)
  }

  const sendHug = () => {
    setHugPower((prev) => Math.min(prev + 1, 8))
  }

  const nextReason = () => {
    setReasonIndex((prev) => (prev + 1) % reasons.length)
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Jen pro moji lásku ✨</p>
        <h1>Ahoj, zlatíčko</h1>
        <p className="subtitle">Tahle appka je jen pro tebe a tvoje krásné srdce 💗</p>

        <button className="main-love-btn" onClick={nextLoveLine}>
          Jsi moje zlatíčko! 💞
        </button>

        <div key={heartRain} className="heart-rain" aria-hidden="true">
          <span>💗</span>
          <span>💕</span>
          <span>💓</span>
          <span>💞</span>
          <span>💘</span>
        </div>

        <nav className="section-nav" aria-label="Sekce appky">
          {sections.map((section) => (
            <button
              key={section.id}
              className={section.id === activeSection ? 'tab-btn active' : 'tab-btn'}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="content-card">
        {activeSection === 'doktorka' && (
          <div className="panel slide-up">
            <h2>Budeš skvělá doktorka 👩‍⚕️</h2>
            <p className="panel-text">Klikni na doktorku a uvidíš další pochvalu.</p>

            <button className="avatar-btn" onClick={nextCompliment}>
              👩‍⚕️
            </button>

            <p className="highlight-line">{doctorCompliments[complimentIndex]}</p>

            <div className="skills">
              {doctorSkills.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="skill-meta">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${skill.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'miluju' && (
          <div className="panel slide-up">
            <h2>Miluju tě 💌</h2>
            <p className="panel-text">Každé kliknutí pošle další vlnu lásky.</p>

            <p className="highlight-line">{rotatingLoveLines[loveIndex]}</p>

            <button className="action-btn" onClick={nextLoveLine}>
              Poslat další lásku
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

        {activeSection === 'obejmout' && (
          <div className="panel slide-up">
            <h2>Virtuální objetí 🤗</h2>
            <p className="panel-text">Mačkej tlačítko a obejmutí zesílí.</p>

            <div className="hug-meter">
              <div className="hug-fill" style={{ width: `${hugPower * 12.5}%` }}></div>
            </div>

            <p className="hug-face" style={{ transform: `scale(${1 + hugPower * 0.04})` }}>
              🫂
            </p>

            <button className="action-btn" onClick={sendHug}>
              Obejmi mě
            </button>

            <button className="ghost-btn" onClick={() => setHugPower(0)}>
              Reset objetí
            </button>
          </div>
        )}

        {activeSection === 'duvody' && (
          <div className="panel slide-up">
            <h2>7 důvodů, proč tě miluju ⭐</h2>
            <p className="panel-text">Proklikej si všechny důvody.</p>

            <p className="highlight-line">{reasons[reasonIndex]}</p>

            <button className="action-btn" onClick={nextReason}>
              Další důvod
            </button>

            <div className="reason-dots" aria-hidden="true">
              {reasons.map((_, index) => (
                <span key={index} className={index === reasonIndex ? 'dot active' : 'dot'}></span>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="app-footer">
        Made with love for my favorite future doctor 💫
      </footer>
    </main>
  )
}

export default App
