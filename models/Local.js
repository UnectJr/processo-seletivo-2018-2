const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Criando o Schema para o BD
const LocalSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  moradia: {
    type: String,
    required: true
  },
  vagas: {
    type: String,
    required: true
  },
  quarto: {
    type: String,
    required: true
  },
  mobilia: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  grupo: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

module.exports = Local = mongoose.model("local", LocalSchema);
