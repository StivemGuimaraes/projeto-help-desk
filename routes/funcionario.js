const express = require("express");
const router = express.Router();
bd = require("../models/bd_aluno");
bd1 = require("../models/bd_professor");

router.get("/", (req, res) => {
  res.render("funcionario/index");
});

router.get("/cadastrar-aluno", (req, res) => {
  res.render("funcionario/cadastro_aluno");
});

router.post("/cadastrar-aluno/nova", (req, res) => {
  bd.insert_aluno({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});

router.get("/cadastrar-professor", (req, res) => {
  res.render("funcionario/cadastro_professor");
});

router.get("/professores", (req, res) => {
  res.render("funcionario/professores");
  bd1.select_professorer
});

router.post("/cadastrar-professor/nova", (req, res) => {
  bd1.insert_professor({
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    senha: req.body.senha,
  });
});
module.exports = router;
