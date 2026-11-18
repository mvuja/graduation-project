import { useState } from "react";
import { getCategory } from "../taskModel.js";
import CategorySelect from "./CategorySelect.jsx";

const initialForm = { title: "", subject: "", deadline: "", priority: "high", category: "none" };

export default function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask({
      title: form.title.trim(),
      subject: form.subject.trim(),
      deadline: form.deadline,
      priority: form.priority,
      category: getCategory(form.category),
    });

    setForm(initialForm);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Naziv obaveze</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Npr. Zavrsiti seminarski rad"
          value={form.title}
          onChange={updateField}
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="subject">Predmet</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Npr. Web programiranje"
            value={form.subject}
            onChange={updateField}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="deadline">Rok</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={updateField}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="priority">Prioritet</label>
          <select id="priority" name="priority" value={form.priority} onChange={updateField}>
            <option value="high">Visok</option>
            <option value="medium">Srednji</option>
            <option value="low">Nizak</option>
          </select>
        </div>

        <CategorySelect
          id="category"
          name="category"
          label="Kategorija"
          value={form.category}
          onChange={updateField}
        />
      </div>

      <button className="primary-button" type="submit">
        Dodaj obavezu
      </button>
    </form>
  );
}
