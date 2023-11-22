const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cords = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

//Conexão com o banco de dados
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server rodando na porta ${PORT}')
        })
    })
    .catch((err) => console.log(err))