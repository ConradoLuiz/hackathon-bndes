const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const LicaoSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: true,
    enum: ["português", "matemática", "história", "geografia"],
  },
  curtidas: {
    type: Number,
    default: 0,
  },
  imagem: {
    type: String,
  },
  media: {
    type: String,
  },
  dt_criado: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

function validarLicao(licao) {
  const schema = joi.object({
    titulo: joi.string().required(),
    conteudo: joi.string().required(),
    materia: joi
      .string()
      .valid("português", "matemática", "história", "geografia")
      .required(),
    curtidas: joi.number().integer(),
    imagem: joi.string().required(),
    media: joi.string(),
    dt_criado: joi.date(),
  });

  return schema.validate(licao);
}

exports.LicaoSchema = LicaoSchema;
exports.validarLicao = validarLicao;
exports.Licoes = mongoose.model("Licao", LicaoSchema, "Lições");
