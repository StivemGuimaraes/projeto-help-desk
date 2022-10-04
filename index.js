const express = require("express");
const app = express();
const path = require("path");
const port = 8008;

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "/public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});

app.get("/Cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/cadastro.html"));
});

app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "/html/login.html"));
});

app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
