const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("funcionario/index");
});

router.get("/cadastrar-alunos", (req, res) => {
  res.render("funcionario/cadastro");
});
module.exports = router;
