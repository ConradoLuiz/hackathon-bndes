import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export function Licao(props) {
  const { licaoId } = useParams();
  useEffect(() => {}, []);
  return <div>aqui é a lição {licaoId}</div>;
}
