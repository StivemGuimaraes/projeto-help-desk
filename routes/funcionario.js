const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");
const bd1 = require("../models/bd_professor");

router.get("/", (req, res) => {
  res.render("funcionario/index");
});

router.get("/cadastrar-aluno", (req, res) => {
  res.render("funcionario/cadastro_aluno");
});

router.post("/cadastrar-aluno/nova", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("funcionario/cadastro_aluno", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuario invalido";
    res.render("funcionario/cadastro_aluno", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("funcionario/cadastro_aluno", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("funcionario/cadastro_aluno", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("funcionario/cadastro_aluno", { error });
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_aluno", { error });
  } else {
    bd.select_aluno(req.body.matricula)
      .then((matricula) => {
        if (matricula) {
          error = "Aluno já cadastrado no sistema";
          res.render("funcionario/cadastro_aluno", { error });
        } else {
          bd.select_senha(req.body.senha)
            .then((senha) => {
              if (senha) {
                error = "Senha já cadastrada no sistema";
                res.render("funcionario/cadastro_aluno", { error });
              } else {
                bd.insert_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  senha: req.body.senha,
                });
                req.flash("sucess_msg", "Aluno cadastrado com sucesso");
                res.redirect("/funcionario/aluno");
              }
            })
            .catch((error) => {
              console.log("deu error", error);
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/funcionario/aluno");
            });
        }
      })
      .catch((error) => {
        console.log("deu error", error);
        req.flash("error_msg", "Error no sistema tente novamente mais tarde");
        res.redirect("/funcionario/alunos");
      });
  }
});

router.get("/cadastrar-professor", (req, res) => {
  res.render("funcionario/cadastro_professor");
});

router.post("/cadastrar-professor/nova", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("funcionario/cadastro_professor", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("funcionario/cadastro_professor", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("funcionario/cadastro_professor", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("funcionario/cadastro_professor", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("funcionario/cadastro_professor", { error });
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_professor", { error });
  } else {
    bd1
      .select_professor(req.body.matricula)
      .then((matricula) => {
        if (matricula) {
          error = "Professor já cadastrado no sistema";
          res.render("funcionario/cadastro_professor", { error });
        } else {
          bd1
            .select_senha(req.body.senha)
            .then((senha) => {
              if (senha) {
                error = "Senha já cadastrada no sistema";
                res.render("funcionario/cadastro_professor", { error });
              } else {
                bd1.insert_professor({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  senha: req.body.senha,
                });
                req.flash("sucess_msg", "Professor cadastrado com sucesso");
                res.redirect("/funcionario/professor");
              }
            })
            .catch((error) => {
              console.log("deu error", error);
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
            });
        }
      })
      .catch((error) => {
        console.log("deu error", error);
        req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      });
  }
});

router.get("/professor", (req, res) => {
  bd1.select_professorAll().then((professor) => {
    res.render("funcionario/professores", { professor });
  });
});

router.get("/aluno", (req, res) => {
  bd.select_alunoAll().then((aluno) => {
    res.render("funcionario/alunos", { aluno });
  });
});

module.exports = router;
