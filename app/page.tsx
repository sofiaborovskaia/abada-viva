"use client";

import Link from "next/link";
import Image from "next/image";
import { useSchool } from "@/contexts/SchoolContext";
import ButtonLink from "./components/ButtonLink";
import styles from "./page.module.css";

export default function Home() {
  const { school } = useSchool();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoContainer}>
          <Image
            src="/abada-lisboa-logo.png"
            alt="Abadá Capoeira Lisboa Logo"
            width={300}
            height={300}
            priority
            className={styles.logo}
          />
        </div>
        <h1 className={styles.title}>{school.name}</h1>
        <p className={styles.description}>
          Your capoeira community is here. Book your classes, manage your
          schedule, and stay connected with your fellow capoeiristas.
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Ready to train?</h2>
        <p className={styles.cardText}>
          Browse our upcoming classes and reserve your spot. We offer classes
          for all levels throughout the week.
        </p>
        <ButtonLink href="/book-class" variant="primary">
          Book a Class
        </ButtonLink>
      </div>

      <div className={styles.reminder}>
        <p className={styles.reminderText}>
          💡 <strong>Don't forget:</strong> Please complete your profile so our
          teachers have all the relevant information about your experience and
          any special requirements.
        </p>
        <Link href="/profile" className={styles.profileLink}>
          Update Profile →
        </Link>
      </div>
    </div>
  );
}
