"use client";

import Image from "next/image";
import { useSchool } from "@/contexts/SchoolContext";
import { useUser } from "@/contexts/UserContext";
import HomeStudent from "./components/HomeStudent";
import HomeTeacher from "./components/HomeTeacher";
import styles from "./page.module.css";

export default function Home() {
  const { school } = useSchool();
  const { user } = useUser();

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

      {user.role === "student" ? <HomeStudent /> : <HomeTeacher />}
    </div>
  );
}
