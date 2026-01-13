import Link from "next/link";
import ButtonLink from "../components/ButtonLink";
import styles from "./Home.module.css";

export default function HomeStudent() {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Pronto para treinar?</h2>
        <p className={styles.cardText}>
          Explore as nossas próximas aulas e reserve o seu lugar. Oferecemos
          aulas para todos os níveis durante a semana.
        </p>
        <ButtonLink href="/book-class" variant="primary">
          Reservar Aula
        </ButtonLink>
      </div>

      <div className={styles.reminder}>
        <p className={styles.reminderText}>
          💡 <strong>Não se esqueça:</strong> Complete o seu perfil para que os
          nossos professores tenham toda a informação relevante sobre a sua
          experiência e quaisquer requisitos especiais.
        </p>
        <Link href="/profile" className={styles.profileLink}>
          Atualizar Perfil →
        </Link>
      </div>
    </>
  );
}
