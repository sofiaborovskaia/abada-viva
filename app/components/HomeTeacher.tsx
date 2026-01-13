import ButtonLink from "../components/ButtonLink";
import styles from "./Home.module.css";

export default function HomeTeacher() {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Manage Your Classes</h2>
        <p className={styles.cardText}>
          View this week's booking overview to see which students have signed up
          for your classes and track attendance.
        </p>
        <ButtonLink href="/admin/bookings" variant="primary">
          View Booking Overview
        </ButtonLink>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Class Templates</h2>
        <p className={styles.cardText}>
          Create recurring class schedules (templates) that automatically
          generate class instances for the next 4 weeks. Students can book these
          classes through their booking page.
        </p>
        <ButtonLink href="/admin/class-templates" variant="secondary">
          Manage Templates
        </ButtonLink>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          ℹ️ <strong>How it works:</strong> Class templates define your
          recurring schedule (e.g., "Mondays at 6 PM"). The system automatically
          generates individual class instances that students can book. When you
          update a template, future classes are regenerated.
        </p>
      </div>
    </>
  );
}
