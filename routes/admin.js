const express = require("express");
const router = express.Router();
const bd = require("../models/bd_professor");
const bd1 = require("../models/bd_funcionario");
const bd2 = require("../models/bd_aluno");
const bd3 = require("../models/bd_chamado");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/cadastrar-professor", (req, res) => {
  res.render("admin/cadastro_professor");
});

router.post("/cadastrar-professor/nova", (req, res) => {
  bd.insert_professor({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});

router.get("/cadastrar-funcionario", (req, res) => {
  res.render("admin/cadastro_funcionario");
});

router.post("/cadastrar-funcionario/nova", (req, res) => {
  bd1.insert_funcionario({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});

router.get("/cadastrar-aluno", (req, res) => {
  res.render("admin/cadastro_aluno");
});

router.post("/cadastrar-aluno/nova", (req, res) => {
  bd2.insert_aluno({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});
router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/chamado", (req, res) => {
  res.render("admin/chamado", {chamado: bd3.select_chamado});
  console.log(bd3.select_chamado());
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
