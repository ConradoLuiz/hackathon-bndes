import React, { useEffect } from "react";
import useSWR from "swr";
import Moment from "moment";
import "moment/locale/pt-br";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import styles from "./licaoPage.module.scss";
import { useParams } from "react-router-dom";
import { API_URL } from "../../services/diploma-api";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function Licao(props) {
  Moment.locale("pt-br");

  const { licaoId } = useParams();
  const { data, error } = useSWR(`${API_URL}/licoes/${licaoId}`, fetcher);

  useEffect(() => {}, []);
  return (
    <div className={styles.licaoPageContainer}>
      <Header />
      <main>
        <div
          style={{
            // margin: "40px 0",
            width: "100%",
            minHeight: "80vh",
            backgroundImage: `url(${data?.licao.imagem})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        ></div>
        <div className={styles.textArea}>
          <div className={styles.text}>
            <h1>{data?.licao.titulo}</h1>
            <span>
              Criado em{" "}
              {data?.licao && Moment(data?.licao.dt_criado).format("LLL")}
            </span>
            <p>{data?.licao.conteudo}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
