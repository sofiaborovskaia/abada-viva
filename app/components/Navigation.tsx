"use client";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const { user, toggleRole } = useUser();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Abada Viva
        </Link>
        <div className={styles.links}>
          {user.role === "student" ? (
            <Link href="/bookings" className={styles.link}>
              My Bookings
            </Link>
          ) : (
            <Link href="/admin/bookings" className={styles.link}>
              Booking Overview
            </Link>
          )}
          <Link href="/profile" className={styles.link}>
            My Profile
          </Link>
          <button onClick={toggleRole} className={styles.roleToggle}>
            {user.role === "student" ? "👨‍🎓 Student" : "👨‍🏫 Teacher"}
          </button>
        </div>
      </div>
    </nav>
  );
}
