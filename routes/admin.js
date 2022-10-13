const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/cadastrar-professor", (req, res) => {
  res.render("admin/cadastro");
});

router.get("/cadastrar-funcionario", (req, res) => {
  res.render("admin/cadastro");
});

router.get("/cadastrar-aluno", (req, res) => {
  res.render("admin/cadastro");
});

module.exports = router;
