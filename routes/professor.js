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
  var error;
  if (req.user[0].eAdmin == 2) {
    var professor_matricula = req.user[0].matricula;
  } else {
    var professor_matricula = null;
  }
  if (
    !req.body.titulo ||
    typeof req.body.titulo === undefined ||
    req.body.titulo === null
  ) {
    error = "Titulo invalido";
    res.render("professor/criar_chamado", { error });
  } else if (
    !req.body.assunto ||
    typeof req.body.assunto === undefined ||
    req.body.assunto === null
  ) {
    error = "Assunto invalido";
    res.render("professor/criar_chamado", { error });
  } else if (
    !req.body.nivel ||
    typeof req.body.nivel === undefined ||
    req.body.nivel === null ||
    req.body.nivel === "Selecione"
  ) {
    error = "Nível invalido";
    res.render("professor/criar_chamado", { error });
  } else if (
    !req.body.prioridade ||
    typeof req.body.prioridade === undefined ||
    req.body.prioridade === null ||
    req.body.prioridade === "Selecione"
  ) {
    error = "Prioridade invalida";
    res.render("professor/criar_chamado", { error });
  } else if (
    !req.body.descricao ||
    typeof req.body.descricao === undefined ||
    req.body.descricao === null
  ) {
    error = "Descrição invalida";
    res.render("professor/criar_chamado", { error });
  } else {
    bd1
      .insert_chamado({
        titulo: req.body.titulo,
        assunto: req.body.assunto,
        nome: req.body.nome,
        nivel: req.body.nivel,
        prioridade: req.body.prioridade,
        descricao: req.body.descricao,
        fk_professor: professor_matricula,
      })
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("/professor/criar_chamado", { error });
        } else {
          req.flash("sucess_msg", "Chamado cadastrado com sucesso");
          res.redirect("/professor/criar-chamado");
        }
      });
  }
});

router.get("/chamado", (req, res) => {
  res.render("professor/chamado_professor");
});

router.get("/atendimento", (req, res) => {
  res.render("professor/atendimento");
});

module.exports = router;
