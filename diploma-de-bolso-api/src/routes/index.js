const express = require("express");
const licoes = require("./licoes");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Bem vindo a API do Diploma de Bolso",
  });
});

router.use("/licoes", licoes);

module.exports = router;
