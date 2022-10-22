const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("aluno/index");
});
router.get("/atendimento", (req, res) => {
  res.render("aluno/atendimento");
});

router.get("/criar-chamado", (req, res) => {
  res.render("aluno/criar_chamado");
});

module.exports = router;
