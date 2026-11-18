import CategorySelect from "./CategorySelect.jsx";

const filters = [
  { value: "all", label: "Sve" },
  { value: "open", label: "Aktivne" },
  { value: "done", label: "Zavrsene" },
  { value: "high", label: "Visok prioritet" },
];

export default function FilterBar({ activeFilter, onFilterChange, activeCategory, onCategoryChange }) {
  return (
    <>
      <div className="toolbar" aria-label="Filteri">
        {filters.map((filter) => (
          <button
            className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}
            aria-pressed={activeFilter === filter.value}
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <CategorySelect
        id="categoryFilter"
        label="Filtriraj po kategoriji"
        value={activeCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="category-filter"
        includeAll
      />
    </>
  );
}
