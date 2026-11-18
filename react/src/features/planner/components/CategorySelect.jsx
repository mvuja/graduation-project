import { categoryLabels } from "../taskModel.js";

export default function CategorySelect({ id, name, label, value, onChange, includeAll = false, className = "" }) {
  return (
    <div className={className ? `form-row ${className}` : "form-row"}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {includeAll && <option value="all">Sve kategorije</option>}
        {Object.entries(categoryLabels).map(([key, text]) => (
          <option key={key} value={key}>{text}</option>
        ))}
      </select>
    </div>
  );
}
