const express = require("express");
const utils = require("../utils");
const { Licoes, validarLicao, listaMaterias } = require("../models/Licoes");
const router = express.Router();

router.get("/", async (req, res) => {
  const { titulo, materia, sort, orderby } = req.query;

  const match = {};
  const _sort = {};

  if (titulo) {
    match.titulo = new RegExp(`${titulo}`, "gi");
  }
  if (materia && materia !== "*") {
    match.materia = materia;
  }
  if (sort && orderby) {
    _sort[sort] = orderby === "desc" ? -1 : 1;
  }

  const licoes = await Licoes.find(match).select("-conteudo").sort(_sort);

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

router.put("/:id", utils.isValidId, async (req, res, next) => {
  const { id } = req.params;
  const { titulo, conteudo, materia, imagem, media, mediaAutor } = req.body;

  const update = {};

  if (titulo) update.titulo = titulo;
  if (conteudo) update.conteudo = conteudo;
  if (materia && listaMaterias.includes(materia)) update.materia = materia;
  if (imagem) update.imagem = imagem;
  if (media) update.media = media;
  if (mediaAutor) update.mediaAutor = mediaAutor;

  const nova_licao = await Licoes.findByIdAndUpdate(id, update, { new: true });

  if (!nova_licao) {
    res.status(404);
    return res.json({
      message:
        "Não foi encontrado nenhuma lição com esse Id... Nada foi alterado...",
    });
  }

  res.status(200);
  return res.json({ licao: nova_licao });
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
