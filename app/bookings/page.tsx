import Link from "next/link";
import styles from "./bookings.module.css";

export default function BookingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      <p className={styles.placeholder}>Your bookings will appear here...</p>
      <Link href="/book-class" className={styles.bookButton}>
        Book a Class
      </Link>
    </div>
  );
}
