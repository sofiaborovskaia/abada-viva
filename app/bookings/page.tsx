"use client";

import { useUser } from "@/contexts/UserContext";
import { useBooking } from "@/contexts/BookingContext";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import styles from "./bookings.module.css";

export default function BookingsPage() {
  const { user } = useUser();
  const { bookings, instances, unbookClass } = useBooking();

  // Helper to capitalize first letter
  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get user's bookings
  const userBookings = bookings.filter(
    (b) => b.userId === user.id && b.status === "booked"
  );

  // Get instances for booked classes
  const bookedInstances = userBookings
    .map((booking) => {
      const instance = instances.find((i) => i.id === booking.instanceId);
      return instance ? { booking, instance } : null;
    })
    .filter((item) => item !== null)
    .sort((a, b) => a!.instance.date.getTime() - b!.instance.date.getTime());

  // Group by date
  const groupedByDate = bookedInstances.reduce((acc, item) => {
    if (!item) return acc;
    const dateKey = capitalizeFirst(
      item.instance.date.toLocaleDateString("pt-PT", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, typeof bookedInstances>);

  // Sort each group by time
  Object.keys(groupedByDate).forEach((date) => {
    groupedByDate[date].sort((a, b) =>
      a!.instance.time.localeCompare(b!.instance.time)
    );
  });

  const handleCancel = (instanceId: string) => {
    if (confirm("Tem certeza que deseja cancelar esta reserva?")) {
      unbookClass(instanceId, user.id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Minhas Reservas</h1>
        <ButtonLink href="/book-class" variant="primary">
          Reservar Aula
        </ButtonLink>
      </div>

      {bookedInstances.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Você não tem nenhuma reserva futura.
          </p>
          <ButtonLink href="/book-class" variant="primary">
            Ver Aulas
          </ButtonLink>
        </div>
      ) : (
        Object.entries(groupedByDate).map(([date, items]) => (
          <div key={date} className={styles.dayGroup}>
            <h2 className={styles.dayHeader}>{date}</h2>
            <div className={styles.bookingList}>
              {items.map(
                (item) =>
                  item && (
                    <div key={item.booking.id} className={styles.bookingItem}>
                      <div className={styles.bookingInfo}>
                        <div className={styles.mainInfo}>
                          <h3 className={styles.className}>
                            {item.instance.name}
                          </h3>
                          <span className={styles.time}>
                            {item.instance.time}
                          </span>
                        </div>
                        <div className={styles.details}>
                          <span className={styles.detail}>
                            📍 {item.instance.location}
                          </span>
                          <span className={styles.detail}>
                            Confirmados: {item.instance.bookedCount}/
                            {item.instance.capacity}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCancel(item.instance.id)}
                        variant="danger"
                      >
                        Cancelar
                      </Button>
                    </div>
                  )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
