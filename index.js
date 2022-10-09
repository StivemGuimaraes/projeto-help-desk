const express = require("express");
const app = express();
const path = require("path");
const port = 8008;

app.use(express.static(path.join(__dirname, "public")));

app.get("/Index", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});

app.get("/Cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/cadastro.html"));
});

app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/login.html"));
});

app.get("/Chamado", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/chamado.html"));
});

app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
