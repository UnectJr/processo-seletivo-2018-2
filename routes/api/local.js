const express = require("express");
const router = express.Router();

//Modelo do Local
const Local = require("../../models/Local");

// Postando um local no MongoDB

router.post("/create", (req, res) => {
  const newLocal = new Local({
    nome: req.body.nome,
    moradia: req.body.moradia,
    vagas: req.body.vagas,
    quarto: req.body.quarto,
    mobilia: req.body.mobilia,
    valor: req.body.valor,
    grupo: req.body.grupo,
    endereco: req.body.endereco,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  newLocal.save().then(item => res.json(item));
  // res.redirect("http://127.0.0.1:5500/index.html");
});
// Coletando todos os locais no banco.
router.get("/", (req, res) => {
  Local.find().then(local => res.json(local));
  // console.log(local);
});

module.exports = router;
