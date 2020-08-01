import React from "react";
import { ImageCard } from "./ImageCard";
import { useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Card, Select } from "antd";
import styles from "./licoesDisplay.module.scss";

const { Option } = Select;

export function LicoesDisplay() {
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
        <ImageCard
          imageUrl={
            "https://www.traduzca.com/wp-content/uploads/2019/09/o-caminho-de-dom-pedro-i-ate-a-independencia-do-brasil-1000x480.jpg"
          }
          link={"/licoes/dhj3h5j5k3lh45j"}
        >
          <h3>Independência do Brasil</h3>
          <div>31/07/2020</div>
        </ImageCard>
        <ImageCard
          imageUrl={
            "https://www.traduzca.com/wp-content/uploads/2019/09/o-caminho-de-dom-pedro-i-ate-a-independencia-do-brasil-1000x480.jpg"
          }
          link={"/licoes/dhj3h5j5k3lh45j"}
          onClick={() => history.push("/licoes/dhjhrj3h")}
        >
          <h3>Independência do Brasil</h3>
          <div>31/07/2020</div>
        </ImageCard>
      </div>
    </div>
  );
}
