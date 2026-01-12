"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import Button from "./Button";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const { user, toggleRole } = useUser();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/abada-capoeira-logo.png"
            alt="Abadá Capoeira"
            width={70}
            height={70}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Abadá Viva</span>
        </Link>
        <div className={styles.links}>
          {user.role === "student" && (
            <Link href="/book-class" className={styles.link}>
              Book Class
            </Link>
          )}
          {user.role === "student" ? (
            <Link href="/bookings" className={styles.link}>
              My Bookings
            </Link>
          ) : (
            <>
              <Link href="/admin/class-templates" className={styles.link}>
                Class Templates
              </Link>
              <Link href="/admin/bookings" className={styles.link}>
                Booking Overview
              </Link>
            </>
          )}
          <Link href="/profile" className={styles.link}>
            My Profile
          </Link>
          <Button onClick={toggleRole} variant="ghost">
            {user.role === "student" ? "👨‍🎓 Student" : "👨‍🏫 Teacher"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
