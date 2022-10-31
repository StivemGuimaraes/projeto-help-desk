const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");
const bd1 = require("../models/bd_chamado");

router.get("/", (req, res) => {
  res.render("professor/index");
});
router.get("/cadastrar-aluno", (req, res) => {
  res.render("professor/cadastro_aluno");
});
router.post("/cadastrar-aluno/nova", (req, res) => {
  bd.insert_aluno({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});

router.get("/criar-chamado", (req, res) => {
  res.render("professor/criar_chamado");
});

router.post("/criar-chamado/nova", (req, res) => {
  bd1.insert_chamado({
    titulo: req.body.titulo,
    assunto: req.body.assunto,
    nome: req.body.nome,
    nivel: req.body.nivel,
    prioridade: req.body.prioridade,
    descricao: req.body.descricao,
  });
  res.redirect("/");
});

router.get("/chamado", (req, res) => {
  res.render("professor/chamado_professor");
});

router.get("/atendimento", (req, res) => {
  res.render("professor/atendimento");
});
module.exports = router;
