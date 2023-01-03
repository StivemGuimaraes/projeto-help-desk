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
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_aluno", { error });
  } else {
    bd.select_aluno(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("funcionario/cadastro_aluno", { error });
        } else {
          bd.select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_aluno", { error });
              } else {
                bd.insert_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  senha: req.body.senha,
                })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("funcionario/cadastro_aluno", { error });
                    } else {
                      req.flash("sucess_msg", "Aluno cadastrado com sucesso");
                      res.redirect("/funcionario/aluno");
                    }
                  })
                  .catch((error1) => {
                    console.log("deu error", error1);
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("funcionario/cadastro_aluno", { error });
                  });
              }
            })
            .catch((error1) => {
              console.log("deu error", error1);
              error = "Error no sistema tente novamente mais tarde";
              res.render("funcionario/cadastro_aluno", { error });
            });
        }
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("funcionario/cadastro_aluno", { error });
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
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_professor", { error });
  } else {
    bd1
      .select_professor(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("funcionario/cadastro_professor", { error });
        } else {
          bd1
            .select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_professor", { error });
              } else {
                bd1
                  .insert_professor({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    senha: req.body.senha,
                  })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("funcionario/cadastro_professor", { error });
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Professor cadastrado com sucesso"
                      );
                      res.redirect("/funcionario/professor");
                    }
                  })
                  .catch((error1) => {
                    console.log("deu error", error1);
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("funcionario/cadastro_professor", { error });
                  });
              }
            })
            .catch((error1) => {
              console.log("deu error", error1);
              error = "Error no sistema tente novamente mais tarde";
              res.render("funcionario/cadastro_professor", { error });
            });
        }
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("funcionario/cadastro_professor", { error });
      });
  }
});

router.get("/professor", (req, res) => {
  bd1.select_professorAll().then((professor) => {
    if (professor === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("funcionario/professores", { error_mensagem });
    } else if (professor === "vazio") {
      var aviso_mensagem = "!!! Nenhum professor cadastrado no sistema !!!";
      res.render("funcionario/professores", { aviso_mensagem });
    } else {
      res.render("funcionario/professores", { professor });
    }
  });
});

router.get("/aluno", (req, res) => {
  bd.select_alunoAll().then((aluno) => {
    if (aluno === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("funcionario/alunos", { error_mensagem });
    } else if (aluno === "vazio") {
      var aviso_mensagem = "!!! Nenhum aluno cadastrado no sistema !!!";
      res.render("funcionario/alunos", { aviso_mensagem });
    } else {
      res.render("funcionario/alunos", { aluno });
    }
  });
});

module.exports = router;
