import styles from "./book-class.module.css";

export default function BookClassPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Your Class</h1>
      <p className={styles.placeholder}>Class schedule will appear here...</p>
    </div>
  );
}
