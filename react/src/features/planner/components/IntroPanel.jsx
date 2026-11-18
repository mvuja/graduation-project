import StatCard from "./StatCard.jsx";

export default function IntroPanel({ stats }) {
  return (
    <section className="intro-panel">
      <p className="eyebrow">React</p>
      <h1>Studentski planer obaveza</h1>
      <p className="intro-copy">
        Organizuj studentske obaveze, prati rokove i odredi prioritete na jednom mjestu.
      </p>

      <div className="stats-grid" aria-label="Statistika obaveza">
        <StatCard value={stats.total} label="Ukupno" />
        <StatCard value={stats.open} label="Aktivno" />
        <StatCard value={stats.done} label="Zavrseno" />
      </div>
    </section>
  );
}
