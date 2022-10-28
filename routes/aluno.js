const express = require("express");
const router = express.Router();
const bd = require("../models/bd_chamado");

router.get("/", (req, res) => {
  res.render("aluno/index");
});
router.get("/atendimento", (req, res) => {
  res.render("aluno/atendimento");
});

router.get("/criar-chamado", (req, res) => {
  res.render("aluno/criar_chamado");
});

router.post("/criar-chamado/nova", (req, res) => {
  bd.insert_chamado({
    titulo: req.body.titulo,
    assunto: req.body.assunto,
    nome: req.body.nome,
    nivel: req.body.nivel,
    prioridade: req.body.Prioridade,
    descricao: req.body.descricao,
  });
});

module.exports = router;
