const express = require("express");
const utils = require("../utils");
const { Licoes, validarLicao } = require("../models/Licoes");
const router = express.Router();

router.get("/", async (req, res) => {
  const licoes = await Licoes.find().select("-conteudo");

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
      licao,
    });
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const result = validarLicao(req.body);

  if (result.error) {
    res.status(400);
    return res.json({
      message: "Favor preencher os campos corretamente",
    });
  }

  try {
    const nova_licao = new Licoes({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      materia: req.body.materia,
      curtidas: 0,
      imagem: req.body.imagem,
      media: req.body.media,
      dt_criado: Date.now(),
    });

    const licao = await nova_licao.save();

    res.status(201);
    return res.json({
      licao,
    });
  } catch (error) {
    res.status(400);
    return res.json({
      message: "Não foi possivel criar a lição",
    });
  }
});

router.post("/:id/like", utils.isValidId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const licao = await Licoes.findByIdAndUpdate(
      id,
      {
        $inc: { curtidas: 1 },
      },
      {
        new: true,
      }
    );

    if (!licao) {
      res.status(404);
      return res.json({
        message: "Não foi encontrada nenhuma lição com esse id...",
      });
    }

    return res.json({
      licao,
    });
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

module.exports = router;
