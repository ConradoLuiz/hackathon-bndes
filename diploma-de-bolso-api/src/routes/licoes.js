const express = require("express");
const utils = require("../utils");
const { Licoes } = require("../models/Licoes");
const router = express.Router();

router.get("/", async (req, res) => {
  const licoes = await Licoes.find();

  return res.json({
    licoes,
  });
});

router.get("/:id", utils.isValidId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const licao = await Licoes.findById(id);

    if (!licao) {
      res.status(404);
      return res.json({
        message: "Não foi encontrada nenhuma lição com esse id...",
      });
    }

    return res.json({
      ...licao,
    });
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

module.exports = router;
