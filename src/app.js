const express = require("express");
const mongoose = require("mongoose");
const Consulta = require("./models/consulta");

const app = express();
const dbURI =
    "mongodb+srv://ruben:R5t6BpsRSnbcpUgv@veton.rmmqvlj.mongodb.net/test?retryWrites=true&w=majority";
mongoose
    .connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

app.get("/consultas", (req, res) => {
    Consulta.find()
        .then((result) => {
            res.render("consultas", { consultas: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/consultas/:id", (req, res) => {
    const id = req.params.id;
    Consulta.findById(id)
        .then((result) => {
            res.render("detalhes", { consulta: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/consultas", (req, res) => {
    const consulta = new Consulta(req.body);

    consulta
        .save()
        .then((result) => {
            res.redirect("consultas");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/agendar-consulta", (req, res) => {
    Consulta.find()
        .then((result) => {
            res.render("agendar-consulta", { consultas: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete("/consultas/:id", (req, res) => {
    const id = req.params.id;

    Consulta.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/consultas" });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use((req, res) => {
    res.status(404).render("404");
});
