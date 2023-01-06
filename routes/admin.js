const express = require("express");
const router = express.Router();
const bd = require("../models/bd_professor");
const bd1 = require("../models/bd_funcionario");
const bd2 = require("../models/bd_aluno");
const bd3 = require("../models/bd_chamado");
var aluno1;
var professor1;
var funcionario1;
var chamado1;

router.get("/", (req, res) => {
  res.render("admin/index");
});

/*inclusão de dados do professor*/
router.get("/cadastrar-professor", (req, res) => {
  res.render("admin/cadastro_professor");
});

router.post("/cadastrar-professor/nova", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("admin/cadastro_professor", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/cadastro_professor", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("admin/cadastro_professor", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("admin/cadastro_professor", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/cadastro_professor", { error });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/cadastro_professor", { error });
  } else {
    bd.select_professor(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("admin/cadastro_professor", { error });
        } else {
          bd.select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_professor", { error });
              } else {
                bd.insert_professor({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  senha: req.body.senha,
                })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("admin/cadastro_professor", { error });
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Professor cadastrado com sucesso"
                      );
                      res.redirect("/admin/professor");
                    }
                  })
                  .catch((error1) => {
                    console.log("deu error", error1);
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("admin/cadastro_professor", { error });
                  });
              }
            })
            .catch((error1) => {
              console.log("deu error", error1);
              error = "Error no sistema tente novamente mais tarde";
              res.render("admin/cadastro_professor", { error });
            });
        }
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("admin/cadastro_professor", { error });
      });
  }
});

/*inclusão de dados do funcionario*/
router.get("/cadastrar-funcionario", (req, res) => {
  res.render("admin/cadastro_funcionario");
});

router.post("/cadastrar-funcionario/nova", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("admin/cadastro_funcionario", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/cadastro_funcionario", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("admin/cadastro_funcionario", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("admin/cadastro_funcionario", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/cadastro_funcionario", { error });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/cadastro_funcionario", { error });
  } else {
    bd1
      .select_funcionario(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("admin/cadastro_funcionario", { error });
        } else {
          bd1
            .select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_funcionario", { error });
              } else {
                bd1
                  .insert_funcionario({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    senha: req.body.senha,
                  })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("admin/cadastro_funcionario", { error });
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Funcionário cadastrado com sucesso"
                      );
                      res.redirect("/admin/funcionario");
                    }
                  })
                  .catch((error1) => {
                    console.log("deu error", error1);
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("admin/cadastro_funcionario", { error });
                  });
              }
            })
            .catch((error1) => {
              console.log("deu error", error1);
              error = "Error no sistema tente novamente mais tarde";
              res.render("admin/cadastro_funcionario", { error });
            });
        }
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("admin/cadastro_funcionario", { error });
      });
  }
});

/*inclusão de dados do aluno*/
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
    error = "Matricula invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("admin/cadastro_aluno", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/cadastro_aluno", { error });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/cadastro_aluno", { error });
  } else {
    bd2
      .select_aluno(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("admin/cadastro_aluno", { error });
        } else {
          bd2
            .select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_aluno", { error });
              } else {
                bd2
                  .insert_aluno({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    senha: req.body.senha,
                  })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("admin/cadastro_aluno", { error });
                    } else {
                      req.flash("sucess_msg", "Aluno cadastrado com sucesso");
                      res.redirect("/admin/aluno");
                    }
                  })
                  .catch((error1) => {
                    console.log("deu error", error1);
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("admin/cadastro_aluno", { error });
                  });
              }
            })
            .catch((error1) => {
              console.log("deu error", error1);
              error = "Error no sistema tente novamente mais tarde";
              res.render("admin/cadastro_aluno", { error });
            });
        }
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("admin/cadastro_aluno", { error });
      });
  }
});

/*seleção de dados do chamado*/
router.get("/chamado", (req, res) => {
  bd3.select_chamadoAll().then((chamado) => {
    if (chamado === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("admin/chamado", { error_mensagem });
    } else if (chamado === "vazio") {
      var aviso_mensagem = "!!! Nenhum chamado cadastrado no sistema !!!";
      res.render("admin/chamado", { aviso_mensagem });
    } else {
      res.render("admin/chamado", { chamado });
    }
  });
});

router.get("/relatorios", (req, res) => {
  res.render("admin/relatorios");
});

/*seleção de dados do funcionario*/
router.get("/funcionario", (req, res) => {
  bd1.select_funcionarioAll().then((funcionario) => {
    if (funcionario === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("admin/funcionarios", { error_mensagem });
    } else if (funcionario === "vazio") {
      var aviso_mensagem = "!!! Nenhum funcionário cadastrado no sistema !!!";
      res.render("admin/funcionarios", { aviso_mensagem });
    } else {
      res.render("admin/funcionarios", { funcionario });
    }
  });
});

/*seleção de dados do aluno*/
router.get("/aluno", (req, res) => {
  bd2.select_alunoAll().then((aluno) => {
    if (aluno === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("admin/alunos", { error_mensagem });
    } else if (aluno === "vazio") {
      var aviso_mensagem = "!!! Nenhum aluno cadastrado no sistema !!!";
      res.render("admin/alunos", { aviso_mensagem });
    } else {
      res.render("admin/alunos", { aluno });
    }
  });
});

/*seleção de dados do professor*/
router.get("/professor", (req, res) => {
  bd.select_professorAll().then((professor) => {
    if (professor === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("admin/professores", { error_mensagem });
    } else if (professor === "vazio") {
      var aviso_mensagem = "!!! Nenhum professor cadastrado no sistema !!!";
      res.render("admin/professores", { aviso_mensagem });
    } else {
      res.render("admin/professores", { professor });
    }
  });
});

/*alteração de dados do aluno*/
router.get("/aluno/alteracao/:matricula", (req, res) => {
  bd2.select_aluno1(req.params.matricula).then((aluno) => {
    if (aluno === "vazio") {
      req.flash("error_msg", "Aluno não encontrado");
      res.redirect("/admin/aluno");
    } else if (aluno === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("admin/aluno");
    } else {
      aluno = aluno[0];
      aluno1 = aluno;
      res.render("admin/edicao_aluno", { aluno });
    }
  });
});

router.post("/aluno/alteracao/", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (req.body.matricula != aluno1.matricula) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd2
              .delete_update_aluno({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                senha: req.body.senha,
                matricula1: aluno1.matricula,
              })
              .then((aluno) => {
                if (aluno === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/aluno");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do aluno feita com sucesso"
                  );
                  res.redirect("/admin/aluno");
                }
              });
          }
        });
      }
    });
  } else {
    bd2.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd2
          .delete_update_aluno({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            senha: req.body.senha,
            matricula1: aluno1.matricula,
          })
          .then((aluno) => {
            if (aluno === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/aluno");
            } else {
              req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
              res.redirect("/admin/aluno");
            }
          });
      }
    });
  }
});

/*alteração de dados do professor*/
router.get("/professor/alteracao/:matricula", (req, res) => {
  bd.select_professor1(req.params.matricula).then((professor) => {
    if (professor === "vazio") {
      req.flash("error_msg", "Professor não encontrado");
      res.redirect("/admin/professor");
    } else if (professor === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("admin/professor");
    } else {
      professor = professor[0];
      professor1 = professor;
      res.render("admin/edicao_professor", { professor });
    }
  });
});

router.post("/professor/alteracao/", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (req.body.matricula != professor1.matricula) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else {
            bd.delete_update_professor({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              senha: req.body.senha,
              matricula1: professor1.matricula,
            }).then((professor) => {
              if (professor === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/admin/professor");
              } else {
                req.flash(
                  "sucess_msg",
                  "Alteração do professor feita com sucesso"
                );
                res.redirect("/admin/professor");
              }
            });
          }
        });
      }
    });
  } else {
    bd.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
        });
      } else {
        bd.delete_update_professor({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          senha: req.body.senha,
          matricula1: professor1.matricula,
        }).then((professor) => {
          if (professor === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/admin/professor");
          } else {
            req.flash("sucess_msg", "Alteração do professor feita com sucesso");
            res.redirect("/admin/professor");
          }
        });
      }
    });
  }
});

/*exclusao do aluno*/
router.get("/aluno/exclucao/:matricula", (req, res) => {
  bd2.delete_aluno(req.params.matricula).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/aluno");
    } else {
      req.flash("sucess_msg", "Exclusão do aluno feita com sucesso");
      res.redirect("/admin/aluno");
    }
  });
});
module.exports = router;
