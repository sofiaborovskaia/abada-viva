"use client";

import { useUser } from "@/contexts/UserContext";
import { useBooking } from "@/contexts/BookingContext";
import ClassCard from "@/app/components/ClassCard";
import styles from "./book-class.module.css";

export default function BookClassPage() {
  const { user } = useUser();
  const { instances, bookClass, unbookClass, isBooked } = useBooking();

  // Group instances by date
  const groupedByDate = instances.reduce((acc, instance) => {
    const dateKey = instance.date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(instance);
    return acc;
  }, {} as Record<string, typeof instances>);

  // Sort each group by time
  Object.keys(groupedByDate).forEach((date) => {
    groupedByDate[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  const handleBook = (instanceId: string) => {
    bookClass(instanceId, user.id);
  };

  const handleUnbook = (instanceId: string) => {
    unbookClass(instanceId, user.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Your Class</h1>
        <p className={styles.subtitle}>
          Browse upcoming classes and reserve your spot
        </p>
      </div>

      {Object.entries(groupedByDate).map(([date, dayInstances]) => (
        <div key={date} className={styles.dayGroup}>
          <h2 className={styles.dayHeader}>{date}</h2>
          <div className={styles.classList}>
            {dayInstances.map((instance) => (
              <ClassCard
                key={instance.id}
                instance={instance}
                isBooked={isBooked(instance.id, user.id)}
                onBook={handleBook}
                onUnbook={handleUnbook}
              />
            ))}
          </div>
        </div>
      ))}

      {instances.length === 0 && (
        <p className={styles.empty}>No classes available at the moment.</p>
      )}
    </div>
  );
}
