const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("professor/index");
});
router.get("/cadastrar-aluno", (req, res) => {
  res.render("professor/cadastro");
});

router.get("/criar-chamado", (req, res) => {
  res.render("professor/criar_chamado");
});

router.get("/atendimento", (req, res) => {
  res.render("professor/atendimento");
});
module.exports = router;
