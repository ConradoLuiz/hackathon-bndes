import React from "react";
import styles from "./home.module.scss";
import OnlineReading from "../../assets/undraw_online_reading_np7n.svg";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <main>
        <div className={styles.left}>
          <h2>Aprender nunca foi tão fácil</h2>
          <h3>
            Com o App do <strong>Diploma de bolso</strong>, aprender à distancia
            fica muito mais prazeroso
          </h3>
          <button>Baixe agora</button>
          <a href="#">Ou acesse nossa plataforma web</a>
        </div>
        <div className={styles.right}>
          <img src={OnlineReading} alt="Leitura online" />
        </div>
      </main>
    </div>
  );
}
