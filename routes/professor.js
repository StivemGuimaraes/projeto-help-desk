const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");

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

router.get("/atendimento", (req, res) => {
  res.render("professor/atendimento");
});
module.exports = router;
