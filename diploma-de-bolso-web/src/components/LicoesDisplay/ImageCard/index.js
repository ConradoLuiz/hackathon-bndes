import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "antd";

export function ImageCard({ imageUrl, link, onClick, children }) {
  const history = useHistory();

  return (
    <Card
      hoverable
      style={{
        borderRadius: "10px",
      }}
      cover={
        <div
          style={{
            borderRadius: "10px 10px 0 0",
            width: "100%",
            height: "150px",
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      }
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
