import styles from "./admin-bookings.module.css";

export default function AdminBookingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Overview</h1>
      <p className={styles.placeholder}>
        Class booking statistics and attendance will appear here...
      </p>
    </div>
  );
}
