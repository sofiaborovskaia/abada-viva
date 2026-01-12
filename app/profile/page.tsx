"use client";

import { useState, FormEvent } from "react";
import { useUser } from "@/contexts/UserContext";
import { Graduacao } from "@/lib/types";
import Button from "../components/Button";
import styles from "./page.module.css";

export default function ProfilePage() {
  const { user, updateUser } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    graduacao: (user?.graduacao || "Crua") as Graduacao,
    capoeiraExperience: user?.capoeiraExperience || "",
    medicalConditions: user?.medicalConditions || "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        graduacao: (user.graduacao || "Crua") as Graduacao,
        capoeiraExperience: user.capoeiraExperience || "",
        medicalConditions: user.medicalConditions || "",
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      {!isEditing ? (
        <div className={styles.profileView}>
          <div className={styles.field}>
            <label className={styles.label}>First Name</label>
            <p className={styles.value}>{user.firstName}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Last Name</label>
            <p className={styles.value}>{user.lastName}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <p className={styles.value}>{user.email}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <p className={styles.value}>{user.phone || "Not provided"}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Graduação</label>
            <p className={styles.value}>{user.graduacao}</p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Capoeira Experience</label>
            <p className={styles.value}>
              {user.capoeiraExperience || "No information provided"}
            </p>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Medical Conditions</label>
            <p className={styles.value}>
              {user.medicalConditions || "No information provided"}
            </p>
          </div>

          <Button onClick={() => setIsEditing(true)} variant="primary">
            Edit Profile
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="firstName" className={styles.formLabel}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="lastName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="phone" className={styles.formLabel}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={styles.input}
              placeholder="+351..."
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="graduacao" className={styles.formLabel}>
              Graduação
            </label>
            <select
              id="graduacao"
              value={formData.graduacao}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  graduacao: e.target.value as Graduacao,
                })
              }
              className={styles.select}
            >
              <option value="Crua">Crua</option>
              <option value="Crua-Amarela">Crua-Amarela</option>
              <option value="Amarela">Amarela</option>
              <option value="Amarela-Laranja">Amarela-Laranja</option>
              <option value="Laranja">Laranja</option>
              <option value="Laranja-Azul">Laranja-Azul</option>
              <option value="Azul">Azul</option>
              <option value="Azul-Verde">Azul-Verde</option>
              <option value="Verde">Verde</option>
              <option value="Verde-Roxa">Verde-Roxa</option>
              <option value="Roxa">Roxa</option>
              <option value="Roxa-Marrom">Roxa-Marrom</option>
              <option value="Marrom">Marrom</option>
              <option value="Marrom-Vermelha">Marrom-Vermelha</option>
              <option value="Vermelha">Vermelha</option>
              <option value="Vermelha-Branca">Vermelha-Branca</option>
              <option value="Branca">Branca</option>
            </select>
          </div>

          <div className={styles.formField}>
            <label htmlFor="capoeiraExperience" className={styles.formLabel}>
              Capoeira Experience
            </label>
            <textarea
              id="capoeiraExperience"
              value={formData.capoeiraExperience}
              onChange={(e) =>
                setFormData({ ...formData, capoeiraExperience: e.target.value })
              }
              className={styles.textarea}
              placeholder="Have you trained at other schools? What style? How long?"
              rows={3}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="medicalConditions" className={styles.formLabel}>
              Medical Conditions
            </label>
            <textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) =>
                setFormData({ ...formData, medicalConditions: e.target.value })
              }
              className={styles.textarea}
              placeholder="Allergies, injuries, conditions that teachers should know..."
              rows={4}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button type="submit" variant="secondary">
              Save
            </Button>
            <Button type="button" onClick={handleCancel} variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
