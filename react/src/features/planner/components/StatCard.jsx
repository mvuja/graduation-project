export default function StatCard({ value, label }) {
  return (
    <article className="stat-card">
      <span>{value}</span>
      <small>{label}</small>
    </article>
  );
}
