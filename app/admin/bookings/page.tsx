"use client";

import { useBooking } from "@/contexts/BookingContext";
import { getThisWeeksInstances, sortInstancesByDateTime } from "@/lib/utils";
import ClassBookingCard from "@/app/components/ClassBookingCard";
import { mockStudent } from "@/lib/mockData";
import styles from "./admin-bookings.module.css";

export default function AdminBookingsPage() {
  const { instances, bookings } = useBooking();

  // Get this week's instances
  const thisWeekInstances = getThisWeeksInstances(instances);
  const sortedInstances = sortInstancesByDateTime(thisWeekInstances);

  // Create a map of userId to student name
  // TODO: Will come from the backend in the future
  const studentNames: Record<string, string> = {
    [mockStudent.id]: mockStudent.firstName,
    // Add more students as needed
  };

  // Get bookings for each instance
  const getBookingsForInstance = (instanceId: string) => {
    return bookings.filter(
      (b) => b.instanceId === instanceId && b.status === "booked"
    );
  };

  // Calculate stats
  const totalClasses = sortedInstances.length;
  const totalBookings = bookings.filter((b) => b.status === "booked").length;
  const totalCapacity = sortedInstances.reduce(
    (sum, instance) => sum + instance.capacity,
    0
  );
  const utilizationRate =
    totalCapacity > 0 ? Math.round((totalBookings / totalCapacity) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Resumo de Reservas</h1>
        <p className={styles.subtitle}>Aulas desta semana e frequência</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalClasses}</span>
          <span className={styles.statLabel}>Aulas desta Semana</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalBookings}</span>
          <span className={styles.statLabel}>Total de Reservas</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{utilizationRate}%</span>
          <span className={styles.statLabel}>Taxa de Ocupação</span>
        </div>
      </div>

      <div className={styles.classList}>
        {sortedInstances.length > 0 ? (
          sortedInstances.map((instance) => (
            <ClassBookingCard
              key={instance.id}
              instance={instance}
              bookings={getBookingsForInstance(instance.id)}
              studentNames={studentNames}
            />
          ))
        ) : (
          <p className={styles.empty}>
            Nenhuma aula programada para esta semana.
          </p>
        )}
      </div>
    </div>
  );
}
