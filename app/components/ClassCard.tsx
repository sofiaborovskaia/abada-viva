"use client";

import { ClassInstance } from "@/lib/types";
import styles from "./ClassCard.module.css";

interface ClassCardProps {
  instance: ClassInstance;
  isBooked: boolean;
  onBook: (instanceId: string) => void;
  onUnbook: (instanceId: string) => void;
}

export default function ClassCard({
  instance,
  isBooked,
  onBook,
  onUnbook,
}: ClassCardProps) {
  const spotsLeft = instance.capacity - instance.bookedCount;
  const isFull = spotsLeft <= 0;
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0;

  const handleAction = () => {
    if (isBooked) {
      onUnbook(instance.id);
    } else if (!isFull) {
      onBook(instance.id);
    }
  };

  const getStatusClass = () => {
    if (isFull) return styles.full;
    if (isAlmostFull) return styles.almostFull;
    return styles.available;
  };

  return (
    <div className={`${styles.card} ${getStatusClass()}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{instance.name}</h3>
        <span className={styles.time}>{instance.time}</span>
      </div>

      <div className={styles.details}>
        <p className={styles.teacher}>👨‍🏫 {instance.teacher}</p>
        <p className={styles.location}>📍 {instance.location}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.capacity}>
          <span className={styles.spotsLeft}>
            {isFull
              ? "Full"
              : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
          </span>
          <span className={styles.total}>
            {instance.bookedCount}/{instance.capacity}
          </span>
        </div>

        <button
          onClick={handleAction}
          className={`${styles.button} ${
            isBooked ? styles.booked : isFull ? styles.disabled : ""
          }`}
          disabled={isFull && !isBooked}
        >
          {isBooked ? "Cancel Booking" : isFull ? "Full" : "Book"}
        </button>
      </div>

      {instance.waitlistCount > 0 && (
        <p className={styles.waitlist}>{instance.waitlistCount} on waitlist</p>
      )}
    </div>
  );
}
