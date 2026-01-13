import ButtonLink from "../components/ButtonLink";
import styles from "./Home.module.css";

export default function HomeTeacher() {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Aulas reservadas</h2>
        <p className={styles.cardText}>
          Veja o <b>Resumo de Reservas</b> desta semana para ver quais alunos se
          inscreveram nas suas aulas e acompanhe a presença.
        </p>
        <ButtonLink href="/admin/bookings">Ver Resumo de Reservas</ButtonLink>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Modelos de Aula</h2>
        <p className={styles.cardText}>
          Crie ou modifique horários de aulas recorrentes ou eventos puntuais.
          Os alunos podem reservar estas aulas através da sua página de
          reservas.
        </p>
        <ButtonLink href="/admin/class-templates">Gerir Modelos</ButtonLink>
      </div>
    </>
  );
}
