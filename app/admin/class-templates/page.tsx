"use client";

import { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { useSchool } from "@/contexts/SchoolContext";
import ClassTemplateForm from "@/app/components/ClassTemplateForm";
import Button from "@/app/components/Button";
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
          <Button onClick={() => setIsCreating(true)} variant="primary">
            + New Template
          </Button>
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
                <Button
                  onClick={() => setEditingTemplate(template)}
                  variant="primary"
                  disabled={isCreating || editingTemplate !== null}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(template.id)}
                  variant="danger"
                  disabled={isCreating || editingTemplate !== null}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No active class templates.</p>
            <Button onClick={() => setIsCreating(true)} variant="primary">
              Create Your First Template
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
