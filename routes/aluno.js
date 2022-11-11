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
  var error;
  if (
    !req.body.titulo ||
    typeof req.body.titulo === undefined ||
    req.body.titulo === null
  ) {
    error = "Titulo invalido";
    res.render("aluno/criar_chamado", { error });
  } else if (
    !req.body.assunto ||
    typeof req.body.assunto === undefined ||
    req.body.assunto === null
  ) {
    error = "Assunto invalido";
    res.render("aluno/criar_chamado", { error });
  } else if (
    !req.body.nome ||
    typeof req.body.nome === undefined ||
    req.body.nome === null
  ) {
    error = "Nome invalido";
    res.render("aluno/criar_chamado");
  } else if (
    !req.body.nivel ||
    typeof req.body.nivel === undefined ||
    req.body.nivel === null
  ) {
    error = "Nível invalido";
    res.render("aluno/criar_chamado");
  } else if (
    !req.body.prioridade ||
    typeof req.body.prioridade === undefined ||
    req.body.prioridade === null
  ) {
    error = "Prioridade invalida";
    res.render("aluno/criar_chamado");
  }
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
