const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const local = require("./routes/api/local");

const app = express();

app.use(bodyParser.json());

//Configurando o DB
const db = require("./config/keys").mongoURI;

//Concetar ao MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log(err));

//Routes
app.use("/api/local", local);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
