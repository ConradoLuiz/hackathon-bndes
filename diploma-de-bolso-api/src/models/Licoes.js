const mongoose = require("mongoose");

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

exports.LicaoSchema = LicaoSchema;
exports.Licoes = mongoose.model("Licao", LicaoSchema, "Lições");
