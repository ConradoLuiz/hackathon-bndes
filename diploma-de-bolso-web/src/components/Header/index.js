import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../assets/graduation.svg";

export function Header() {
  const history = useHistory();
  return (
    <header className={styles.headerContainer}>
      <h1 onClick={() => history.push("/")}>Diploma de Bolso</h1>

      <img src={logo} className={styles.logo} alt="Logo" />
    </header>
  );
}
