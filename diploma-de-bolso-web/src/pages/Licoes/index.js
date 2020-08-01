import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LicoesDisplay } from "../../components/LicoesDisplay";
import styles from "./licoes.module.scss";

export function Licoes() {
  return (
    <div className={styles.licoesPageContainer}>
      <Header />
      <div className={styles.licoesDescription}>
        <h2>
          Aqui você acompanha as melhores <br />
          Lições
        </h2>
      </div>
      <LicoesDisplay />
      <Footer />
    </div>
  );
}
