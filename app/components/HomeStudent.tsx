import Link from "next/link";
import ButtonLink from "../components/ButtonLink";
import styles from "./Home.module.css";

export default function HomeStudent() {
  return (
    <>
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
    </>
  );
}
