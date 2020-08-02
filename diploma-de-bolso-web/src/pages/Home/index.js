import React from "react";
import { Link } from "react-router-dom";
import Classnames from "classnames";
import styles from "./home.module.scss";
import OnlineReading from "../../assets/undraw_online_reading_np7n.svg";
import WheelBlob from "../../assets/undraw-with-blob.svg";
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
          <Link
            to="/Diploma-De-Bolso.apk"
            className={styles.downloadButton}
            target="_blank"
            download
          >
            Baixe agora
          </Link>
          <p>Ou acesse a nossa</p>
          <Link to="/licoes" className={styles.webApp}>
            Plataforma web
          </Link>
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

      <div
        className={Classnames(
          styles.wheelContainer,
          !isDesktop ? styles.wheelContainerMobile : undefined
        )}
      >
        <img src={WheelBlob} alt="Cadeira de rodas" />

        <div className={styles.wheelText}>
          <h2>
            Com a nossa plataforma web, todos tem uma chance de adquirir
            conhecimento
          </h2>
          <h3>
            Através de um <strong>computador pessoal</strong>,{" "}
            <strong>celular de um amigo</strong>, ou até de uma{" "}
            <strong>biblioteca pública</strong>
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}
