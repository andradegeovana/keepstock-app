const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cords = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    res.send("Home Page");
});

//Conexão com o banco de dados
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server rodando na porta ${PORT}`)
        })
    })
    .catch((err) => console.log(err))