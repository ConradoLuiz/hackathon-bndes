import React, { useEffect, useState } from "react";
import Moment from "moment";
import "moment/locale/pt-br";
import { FiThumbsUp } from "react-icons/fi";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { ImageCard } from "./ImageCard";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Select } from "antd";
import styles from "./licoesDisplay.module.scss";
import { API_URL } from "../../services/diploma-api";

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function LicoesDisplay() {
  Moment.locale("pt-br");

  const { data, error } = useSWR(`${API_URL}/licoes`, fetcher);
  const [likedLessons, setLikedLessons] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  const history = useHistory();

  return (
    <div className={styles.licoesDisplayContainer}>
      <div className={styles.licoesFilter}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Pesquise pelo título da lição..." />
          <Select
            showSearch
            className={styles.selectSubject}
            placeholder="Matérias"
          >
            <Option value="*">Todos</Option>
            <Option value="português">Português</Option>
            <Option value="matemática">Matemática</Option>
            <Option value="história">História</Option>
            <Option value="geografia">Geografia</Option>
          </Select>

          <button type="submit">
            <FiSearch color="var(--accent-blue)" size={18} /> {"  "}Filtrar
          </button>
        </form>
      </div>

      <div className={styles.cardsContainer}>
        {data?.licoes ? (
          data.licoes.map((licao) => (
            <ImageCard
              key={licao._id}
              imageUrl={licao.imagem}
              onClick={() => history.push(`/licoes/${licao._id}`)}
            >
              <h3>{licao.titulo}</h3>
              <p style={{ textTransform: "capitalize" }}>{licao.materia}</p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {Moment(licao.dt_criado).format("MM-DD-YYYY")}
                <div
                  style={{
                    color: "var(--dark-green)",
                    minWidth: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    fetch(`${API_URL}/licoes/${licao._id}/like`, {
                      method: "POST",
                    });
                    setLikedLessons([...likedLessons, licao._id]);
                  }}
                >
                  <FiThumbsUp color="var(--dark-green)" size={24} />
                  {"   "}
                  {likedLessons.includes(licao._id)
                    ? licao.curtidas + 1
                    : licao.curtidas}
                </div>
              </div>
            </ImageCard>
          ))
        ) : (
          <Spin indicator={antIcon} />
        )}
      </div>
    </div>
  );
}
