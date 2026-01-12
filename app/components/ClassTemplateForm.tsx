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
        {template ? "Edit Class Template" : "Create New Class Template"}
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Class Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g., Beginner Capoeira"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="teacher" className={styles.label}>
            Teacher *
          </label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g., Mestre João"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dayOfWeek" className={styles.label}>
            Day of Week *
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
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time" className={styles.label}>
            Time *
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
            Duration (minutes) *
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
            Capacity *
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
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="e.g., Studio A"
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
            placeholder="Optional description of the class..."
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <Button type="button" onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button type="submit" variant="secondary">
          {template ? "Update Template" : "Create Template"}
        </Button>
      </div>
    </form>
  );
}
