import React from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/graduation.svg";

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <h4>Diploma de Bolso</h4>
      <span>Feito por: Conrado Luiz, Leonardo Pereira, Victor Souza</span>
      <img src={logo} className={styles.logo} alt="Logo" />
    </footer>
  );
}
