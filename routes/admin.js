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

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/chamado", (req, res) => {
  res.render("admin/chamado");
});

router.get("/relatorios", (req, res) => {
  res.render("admin/relatorios");
});

router.get("/funcionario", (req, res) => {
  res.render("admin/funcionarios");
});

router.get("/aluno", (req, res) => {
  res.render("admin/alunos");
});

router.get("/professor", (req, res) => {
  res.render("admin/professores");
});

module.exports = router;
