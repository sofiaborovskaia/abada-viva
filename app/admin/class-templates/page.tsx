"use client";

import { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { useSchool } from "@/contexts/SchoolContext";
import ClassTemplateForm from "@/app/components/ClassTemplateForm";
import { ClassTemplate } from "@/lib/types";
import styles from "./class-templates.module.css";

export default function ClassTemplatesPage() {
  const { templates, createTemplate, updateTemplate, deleteTemplate } =
    useBooking();
  const { school } = useSchool();
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ClassTemplate | null>(
    null
  );

  const activeTemplates = templates.filter((t) => t.isActive);

  const handleCreate = (templateData: Omit<ClassTemplate, "id">) => {
    createTemplate(templateData);
    setIsCreating(false);
  };

  const handleUpdate = (templateData: Omit<ClassTemplate, "id">) => {
    if (editingTemplate) {
      updateTemplate(editingTemplate.id, templateData);
      setEditingTemplate(null);
    }
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to deactivate this class template? This will remove all future class instances."
      )
    ) {
      deleteTemplate(id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Class Templates</h1>
          <p className={styles.subtitle}>
            Manage recurring class schedules for {school.name}
          </p>
        </div>
        {!isCreating && !editingTemplate && (
          <button
            onClick={() => setIsCreating(true)}
            className={styles.createButton}
          >
            + New Template
          </button>
        )}
      </div>

      {(isCreating || editingTemplate) && (
        <div className={styles.formContainer}>
          <ClassTemplateForm
            template={editingTemplate || undefined}
            schoolId={school.id}
            onSubmit={editingTemplate ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsCreating(false);
              setEditingTemplate(null);
            }}
          />
        </div>
      )}

      <div className={styles.templateList}>
        {activeTemplates.length > 0 ? (
          activeTemplates.map((template) => (
            <div key={template.id} className={styles.templateCard}>
              <div className={styles.templateInfo}>
                <div className={styles.templateHeader}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <span className={styles.templateSchedule}>
                    {template.dayOfWeek}s at {template.time}
                  </span>
                </div>
                {template.description && (
                  <p className={styles.templateDescription}>
                    {template.description}
                  </p>
                )}
                <div className={styles.templateMeta}>
                  <span className={styles.metaItem}>👨‍🏫 {template.teacher}</span>
                  <span className={styles.metaItem}>
                    📍 {template.location}
                  </span>
                  <span className={styles.metaItem}>
                    👥 Capacity: {template.capacity}
                  </span>
                  <span className={styles.metaItem}>
                    ⏱️ {template.duration} min
                  </span>
                </div>
              </div>

              <div className={styles.templateActions}>
                <button
                  onClick={() => setEditingTemplate(template)}
                  className={styles.editButton}
                  disabled={isCreating || editingTemplate !== null}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className={styles.deleteButton}
                  disabled={isCreating || editingTemplate !== null}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No active class templates.</p>
            <button
              onClick={() => setIsCreating(true)}
              className={styles.emptyButton}
            >
              Create Your First Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
