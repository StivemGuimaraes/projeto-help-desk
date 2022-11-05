const express = require("express");
const router = express.Router();
const bd = require("../models/bd_professor");
const bd1 = require("../models/bd_funcionario");
const bd2 = require("../models/bd_aluno");
var bd3 = require("../models/bd_chamado");

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
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "matricula invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "usuario invalido";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "senha invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "repetição de senha invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "senhas diferentes";
    res.render("admin/cadastro_aluno", { error });
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/cadastro_aluno", { error });
  } else {
    bd2
      .select_aluno({
        matricula: req.body.matricula,
      })
      .then((matricula) => {
        if (matricula === req.body.matricula) {
          error = "Aluno já cadastrado no sistema";
          res.render("admin/cadastro_aluno", { error });
        } else {
          bd2
            .insert_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              senha: req.body.senha,
            })
            .catch((error) => {
              console.log("deu error", error);
              req.flash(
                "error_msg",
                "error no sistema tente novamente mais tarde"
              );
            });
          req.flash("sucess_msg", "aluno cadastrado com sucesso");
          res.redirect("/admin/aluno");
        }
      });
  }
});
router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.get("/chamado", (req, res) => {
  bd3.select_chamado().then((chamado) => {
    res.render("admin/chamado", { chamado });
  });
});

router.get("/relatorios", (req, res) => {
  res.render("admin/relatorios");
});

router.get("/funcionario", (req, res) => {
  bd1.select_funcionarioAll().then((funcionario) => {
    res.render("admin/funcionarios", { funcionario });
  });
});

router.get("/aluno", (req, res) => {
  bd2.select_alunoAll().then((aluno) => {
    res.render("admin/alunos", { aluno });
  });
});

router.get("/professor", (req, res) => {
  bd.select_professorAll().then((professor) => {
    res.render("admin/professores", { professor });
  });
});

module.exports = router;
