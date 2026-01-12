import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
  className?: string;
}

export default function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
