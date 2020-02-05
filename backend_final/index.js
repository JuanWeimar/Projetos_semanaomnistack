const http = require ("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.get("/", function(req, res) {
    res.send("<h1>Servidor On</h1>");
});

mongoose.connect('mongodb+srv://Juan:juan120498@cluster0-ioqto.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

http.createServer(app).listen(3335, () => console.log("Servidor rodando na porta 3334"));
