import React from "react";
import styles from "./header.module.scss";
import logo from "../../assets/graduation.svg";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <h1>Diploma de bolso</h1>

      <img src={logo} className={styles.logo} alt="Logo" />
    </header>
  );
}
