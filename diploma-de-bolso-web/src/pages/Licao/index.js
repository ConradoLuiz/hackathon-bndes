import React, { useEffect, useState } from "react";
import { Affix } from "antd";
import { FiThumbsUp } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
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
  const [affixed, setAffixed] = useState(false);
  const history = useHistory();
  const { licaoId } = useParams();
  const { data, error, mutate } = useSWR(
    `${API_URL}/licoes/${licaoId}`,
    fetcher
  );

  useEffect(() => {}, []);
  return (
    <div className={styles.licaoPageContainer}>
      <Header />
      <main>
        <div
          style={{
            width: "100%",
            minHeight: "80vh",
            backgroundImage: `url(${data?.licao.imagem})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        ></div>
        <div className={styles.textArea}>
          <Affix offsetTop={80} onChange={() => setAffixed(!affixed)}>
            <div
              style={{
                left: affixed ? "-38.7vw" : undefined,
              }}
              className={styles.goBackButton}
              onClick={() => history.goBack()}
            >
              <RiArrowGoBackLine size={24} />
            </div>
          </Affix>

          <Affix offsetTop={80}>
            <div
              style={{
                right: affixed ? "-38.7vw" : undefined,
              }}
              className={styles.likesContainer}
              onClick={() => {
                fetch(`${API_URL}/licoes/${data?.licao._id}/like`, {
                  method: "POST",
                })
                  .then((res) => res.json())
                  .then((data) => mutate(data, false));
              }}
            >
              <FiThumbsUp color="var(--dark-green)" size={24} />{" "}
              {data?.licao.curtidas}
            </div>
          </Affix>

          <div className={styles.text}>
            <h1>{data?.licao.titulo}</h1>
            <h3 style={{ textTransform: "capitalize" }}>
              {data?.licao.materia}
            </h3>
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
