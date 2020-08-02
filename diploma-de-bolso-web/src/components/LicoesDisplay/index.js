import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "moment";
import "moment/locale/pt-br";
import Classnames from "classnames";
import { FiThumbsUp } from "react-icons/fi";
import {
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import { ImageCard } from "./ImageCard";
import { CardsLoading } from "./CardsLoading";
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
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState(null);
  const [sort_Orderby, setSort_Orderby] = useState(null);

  const { data, error } = useSWR(`${API_URL}/licoes`, fetcher);

  function handleSubmit() {
    const params = {};
    if (titulo) {
      params.titulo = titulo;
    }
    if (materia) {
      params.materia = materia;
    }
    if (sort_Orderby) {
      const [sort, orderby] = sort_Orderby.split("-");
      params.sort = sort;
      params.orderby = orderby;
    }

    axios
      .get(`${API_URL}/licoes`, {
        params,
      })
      .then((res) => mutate(`${API_URL}/licoes`, res.data, false));
  }

  const handleSort = (value) => {
    const params = {};
    if (titulo) {
      params.titulo = titulo;
    }
    if (materia) {
      params.materia = materia;
    }
    if (value) {
      const [sort, orderby] = value.split("-");
      params.sort = sort;
      params.orderby = orderby;
    }

    axios
      .get(`${API_URL}/licoes`, {
        params,
      })
      .then((res) => mutate(`${API_URL}/licoes`, res.data, false));
    setSort_Orderby(value);
  };

  const history = useHistory();

  return (
    <div className={styles.licoesDisplayContainer}>
      <div className={styles.licoesFilter}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Pesquise pelo título da lição..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Select
            size="large"
            className={styles.selectSubject}
            placeholder="Matérias"
            value={materia}
            onChange={(value) => setMateria(value)}
            bordered={false}
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
      <Select
        className={Classnames(styles.selectSubject, styles.sortSelect)}
        placeholder="Ordenação"
        value={sort_Orderby}
        onSelect={handleSort}
        size="large"
        bordered={false}
      >
        <Option value="curtidas-desc">
          Curtidas <FaSortAmountDown />
        </Option>
        <Option value="curtidas-asc">
          Curtidas <FaSortAmountDownAlt />
        </Option>
        <Option value="titulo-asc">
          Título <FaSortAlphaDown />
        </Option>
        <Option value="titulo-desc">
          Título <FaSortAlphaUp />
        </Option>
        <Option value="dt_criado-desc">
          Mais recente <FaSortAmountDown />
        </Option>
        <Option value="dt_criado-asc">
          Mais Antigo <FaSortAmountDownAlt />
        </Option>
      </Select>

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
                    })
                      .then((res) => res.json())
                      .then((_data) =>
                        mutate(
                          `${API_URL}/licoes`,
                          {
                            ...data,
                            licoes: data.licoes.map((_licao) =>
                              _licao._id == _data.licao._id
                                ? _data.licao
                                : _licao
                            ),
                          },
                          false
                        )
                      );
                  }}
                >
                  <FiThumbsUp color="var(--dark-green)" size={24} />
                  {"   "}
                  {licao.curtidas}
                </div>
              </div>
            </ImageCard>
          ))
        ) : (
          <CardsLoading />
        )}
      </div>
    </div>
  );
}
