import React from "react";
import Classnames from "classnames";
import styles from "./home.module.scss";
import OnlineReading from "../../assets/undraw_online_reading_np7n.svg";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useDesktop } from "../../utils/mediaQueries";

export function Home() {
  const isDesktop = useDesktop();

  return (
    <div className={styles.homeContainer}>
      <Header />
      <main className={Classnames(!isDesktop ? styles.mainMobile : undefined)}>
        <div
          className={Classnames(
            styles.left,
            !isDesktop ? styles.mainLeftMobile : undefined
          )}
        >
          <h2>Aprender nunca foi tão fácil</h2>
          <h3>
            Com o App do <strong>Diploma de bolso</strong>, aprender à distancia
            fica muito mais prazeroso
          </h3>
          <button>Baixe agora</button>
          <a href="#">Ou acesse nossa plataforma web</a>
        </div>
        <div
          className={Classnames(
            styles.right,
            !isDesktop ? styles.mainRightMobile : undefined
          )}
        >
          <img src={OnlineReading} alt="Leitura online" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
