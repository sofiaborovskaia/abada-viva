"use client";

import { useState } from "react";
import { ClassTemplate, DayOfWeek } from "@/lib/types";
import Button from "./Button";
import styles from "./ClassTemplateForm.module.css";

interface ClassTemplateFormProps {
  template?: ClassTemplate;
  schoolId: string;
  onSubmit: (template: Omit<ClassTemplate, "id">) => void;
  onCancel: () => void;
}

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Portuguese day names for display (keeping English values for system)
const DAY_NAMES: Record<DayOfWeek, string> = {
  Monday: "Segunda-feira",
  Tuesday: "Terça-feira",
  Wednesday: "Quarta-feira",
  Thursday: "Quinta-feira",
  Friday: "Sexta-feira",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

export default function ClassTemplateForm({
  template,
  schoolId,
  onSubmit,
  onCancel,
}: ClassTemplateFormProps) {
  const [formData, setFormData] = useState({
    name: template?.name || "",
    description: template?.description || "",
    dayOfWeek: template?.dayOfWeek || ("Monday" as DayOfWeek),
    time: template?.time || "18:00",
    duration: template?.duration || 90,
    teacher: template?.teacher || "",
    location: template?.location || "",
    capacity: template?.capacity || 20,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      schoolId,
      isActive: true,
      startDate: new Date(),
      endDate: undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "capacity" ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>
        {template ? "Editar Modelo de Aula" : "Criar Novo Modelo de Aula"}
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nome da Aula *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="ex: Capoeira Iniciantes"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="teacher" className={styles.label}>
            Professor *
          </label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="ex: Mestre João"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dayOfWeek" className={styles.label}>
            Dia da Semana *
          </label>
          <select
            id="dayOfWeek"
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
            className={styles.select}
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {DAY_NAMES[day]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time" className={styles.label}>
            Horário *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.label}>
            Duração (minutos) *
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="30"
            step="15"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="capacity" className={styles.label}>
            Capacidade *
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
            className={styles.input}
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="location" className={styles.label}>
            Local *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="ex: Armazém Cultural"
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="description" className={styles.label}>
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
            placeholder="Descrição opcional da aula..."
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <Button type="button" onClick={onCancel} variant="ghost">
          Cancelar
        </Button>
        <Button type="submit" variant="secondary">
          {template ? "Atualizar Modelo" : "Criar Modelo"}
        </Button>
      </div>
    </form>
  );
}
