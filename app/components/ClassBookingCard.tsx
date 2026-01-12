"use client";

import { useState } from "react";
import { ClassInstance, Booking } from "@/lib/types";
import styles from "./ClassBookingCard.module.css";

interface ClassBookingCardProps {
  instance: ClassInstance;
  bookings: Booking[];
  studentNames: Record<string, string>; // userId -> name
}

export default function ClassBookingCard({
  instance,
  bookings,
  studentNames,
}: ClassBookingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const spotsLeft = instance.capacity - instance.bookedCount;
  const percentageFull = Math.round(
    (instance.bookedCount / instance.capacity) * 100
  );

  const getStatusClass = () => {
    if (percentageFull === 100) return styles.full;
    if (percentageFull >= 85) return styles.almostFull;
    return styles.available;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`${styles.card} ${getStatusClass()}`}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.mainInfo}>
          <div className={styles.titleRow}>
            <h3 className={styles.className}>{instance.name}</h3>
            <span className={styles.date}>{formatDate(instance.date)}</span>
          </div>
          <div className={styles.metaInfo}>
            <span className={styles.time}>{instance.time}</span>
            <span className={styles.location}>📍 {instance.location}</span>
            <span className={styles.teacher}>👨‍🏫 {instance.teacher}</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.capacity}>
            <span className={styles.count}>
              {instance.bookedCount}/{instance.capacity}
            </span>
            <span className={styles.label}>
              {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
            </span>
          </div>
          <div className={styles.percentage}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${percentageFull}%` }}
              />
            </div>
            <span className={styles.percentageText}>{percentageFull}%</span>
          </div>
        </div>

        <div className={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</div>
      </button>

      {isExpanded && (
        <div className={styles.studentList}>
          <h4 className={styles.studentListTitle}>
            Booked Students ({bookings.length})
          </h4>
          {bookings.length > 0 ? (
            <ul className={styles.students}>
              {bookings.map((booking) => (
                <li key={booking.id} className={styles.student}>
                  <span className={styles.studentName}>
                    {studentNames[booking.userId] || "Unknown Student"}
                  </span>
                  <span className={styles.bookingTime}>
                    Booked{" "}
                    {new Date(booking.bookedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No bookings yet</p>
          )}
        </div>
      )}
    </div>
  );
}
