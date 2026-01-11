import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Abada Viva
        </Link>
        <div className={styles.links}>
          <Link href="/bookings" className={styles.link}>
            My Bookings
          </Link>
          <Link href="/profile" className={styles.link}>
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
