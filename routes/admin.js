const express = require("express");
const router = express.Router();
const bd = require("../models/bd_professor");
const bd1 = require("../models/bd_funcionario");
const bd2 = require("../models/bd_aluno");
const bd3 = require("../models/bd_chamado");
const fs = require("fs");
const upload = require("../config/multer");
const multer = require("multer");
const alteracaoAlunoImagem = upload
  .alteracao_aluno_imagem()
  .array("imagem_alteracao_chamado", 3);
const alteracaoProfessorImagem = upload
  .alteracao_professor_imagem()
  .array("imagem_alteracao_chamado", 3);
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
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
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
          bd.select_celular(req.body.celular)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_professor", { error });
              } else {
                bd.select_residencial(req.body.residencial)
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
                              celular: req.body.celular,
                              residencial: req.body.residencial,
                              senha: req.body.senha,
                            })
                              .then((msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("admin/cadastro_professor", {
                                    error,
                                  });
                                } else {
                                  var sucesso =
                                    "Professor cadastrado com sucesso";
                                  res.render("admin/cadastro_professor", {
                                    sucesso,
                                  });
                                }
                              })
                              .catch((error1) => {
                                console.log("deu error", error1);
                                error =
                                  "Error no sistema tente novamente mais tarde";
                                res.render("admin/cadastro_professor", {
                                  error,
                                });
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
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
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
            .select_celular(req.body.celular)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_funcionario", { error });
              } else {
                bd1
                  .select_residencial(req.body.residencial)
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
                                celular: req.body.celular,
                                residencial: req.body.residencial,
                                senha: req.body.senha,
                              })
                              .then((msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("admin/cadastro_funcionario", {
                                    error,
                                  });
                                } else {
                                  var sucesso =
                                    "Funcionário cadastrado com sucesso";
                                  res.render("admin/cadastro_funcionario", {
                                    sucesso,
                                  });
                                }
                              })
                              .catch((error1) => {
                                console.log("deu error", error1);
                                error =
                                  "Error no sistema tente novamente mais tarde";
                                res.render("admin/cadastro_professor", {
                                  error,
                                });
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
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
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
            .select_celular(req.body.celular)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/cadastro_aluno", { error });
              } else {
                bd2
                  .select_residencial(req.body.residencial)
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
                                celular: req.body.celular,
                                residencial: req.body.residencial,
                                senha: req.body.senha,
                              })
                              .then((msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("admin/cadastro_aluno", {
                                    error,
                                  });
                                } else {
                                  var sucesso = "Aluno cadastrado com sucesso";
                                  res.render("admin/cadastro_aluno", {
                                    sucesso,
                                  });
                                }
                              })
                              .catch((error1) => {
                                console.log("deu error", error1);
                                error =
                                  "Error no sistema tente novamente mais tarde";
                                res.render("admin/cadastro_professor", {
                                  error,
                                });
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
    res.render("admin/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("admin/edicao_aluno", { error, aluno: aluno1 });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd2.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else if (
                req.body.senha.length <= 7 ||
                req.body.senha2.length <= 7
              ) {
                error = "A senha deve ter mais do que 7 caracteres";
                res.render("admin/edicao_aluno", {
                  error,
                  aluno: aluno1,
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
                        celular: req.body.celular,
                        residencial: req.body.residencial,
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
          }
        });
      }
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd2.select_residencial(req.body.residencial).then((msg) => {
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
                    celular: req.body.celular,
                    residencial: req.body.residencial,
                    senha: aluno1.senha,
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
      }
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.celular != aluno1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
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
                    celular: req.body.celular,
                    residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
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
                    celular: req.body.celular,
                    residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.celular != aluno1.telefone_celular
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd2.select_celular(req.body.celular).then((msg) => {
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
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: aluno1.senha,
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
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.residencial != aluno1.telefone_residencial
  ) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd2.select_residencial(req.body.residencial).then((msg) => {
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
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: aluno1.senha,
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
  } else if (req.body.matricula != aluno1.matricula && req.body.senha != "") {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
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
                celular: req.body.celular,
                residencial: req.body.residencial,
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
  } else if (req.body.matricula != aluno1.matricula) {
    bd2.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2
          .delete_update_aluno({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: aluno1.senha,
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
  } else if (
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd2.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
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
                  .update_aluno({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    celular: req.body.celular,
                    residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial
  ) {
    bd2.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd2
              .update_aluno({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: aluno1.senha,
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
  } else if (
    req.body.celular != aluno1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd2.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
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
              .update_aluno({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
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
  } else if (req.body.celular != aluno1.telefone_celular) {
    bd2.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2
          .update_aluno({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: aluno1.senha,
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
  } else if (
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd2.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
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
              .update_aluno({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
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
  } else if (req.body.residencial != aluno1.telefone_residencial) {
    bd2.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd2
          .update_aluno({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: aluno1.senha,
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
  } else if (req.body.senha != "") {
    bd2.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd2
          .update_aluno({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
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
  } else {
    bd2
      .update_aluno({
        matricula: req.body.matricula,
        usuario: req.body.usuario,
        celular: req.body.celular,
        residencial: req.body.residencial,
        senha: aluno1.senha,
        matricula1: aluno1.matricula,
      })
      .then((aluno) => {
        if (aluno === "error") {
          req.flash("error_msg", "Error no sistema tente novamente mais tarde");
          res.redirect("/admin/aluno");
        } else {
          req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
          res.redirect("/admin/aluno");
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
    res.render("admin/edicao_professor", {
      error,
      professor: professor1,
    });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/edicao_professor", {
      error,
      professor: professor1,
    });
  } else if (
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("admin/edicao_professor", { error, professor: professor1 });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/edicao_professor", {
      error,
      professor: professor1,
    });
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.celular != professor1.telefone_celular &&
    req.body.residencial != professor1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else {
            bd.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_professor", {
                  error,
                  professor: professor1,
                });
              } else if (
                req.body.senha.length <= 7 ||
                req.body.senha2.length <= 7
              ) {
                error = "A senha deve ter mais do que 7 caracteres";
                res.render("admin/edicao_professor", {
                  error,
                  professor: professor1,
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
                      celular: req.body.celular,
                      residencial: req.body.residencial,
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
          }
        });
      }
    });
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.celular != professor1.telefone_celular &&
    req.body.residencial != professor1.telefone_residencial
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else {
            bd.select_residencial(req.body.residencial).then((msg) => {
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
                  celular: req.body.celular,
                  residencial: req.body.residencial,
                  senha: professor1.senha,
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
      }
    });
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.celular != professor1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
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
                  celular: req.body.celular,
                  residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.residencial != professor1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
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
                  celular: req.body.celular,
                  residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.celular != professor1.telefone_celular
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
        });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
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
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: professor1.senha,
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
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.residencial != professor1.telefone_residencial
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
        });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
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
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: professor1.senha,
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
  } else if (
    req.body.matricula != professor1.matricula &&
    req.body.senha != ""
  ) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
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
              celular: req.body.celular,
              residencial: req.body.residencial,
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
  } else if (req.body.matricula != professor1.matricula) {
    bd.select_professor(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.delete_update_professor({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: professor1.senha,
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
  } else if (
    req.body.celular != professor1.telefone_celular &&
    req.body.residencial != professor1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
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
                bd.update_professor({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  celular: req.body.celular,
                  residencial: req.body.residencial,
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
      }
    });
  } else if (
    req.body.celular != professor1.telefone_celular &&
    req.body.residencial != professor1.telefone_residencial
  ) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_professor", {
              error,
              professor: professor1,
            });
          } else {
            bd.update_professor({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: professor1.senha,
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
  } else if (
    req.body.celular != professor1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
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
            bd.update_professor({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
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
  } else if (req.body.celular != professor1.telefone_celular) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.update_professor({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: professor1.senha,
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
  } else if (
    req.body.residencial != professor1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
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
            bd.update_professor({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
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
  } else if (req.body.residencial != professor1.telefone_residencial) {
    bd.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else {
        bd.update_professor({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: professor1.senha,
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
  } else if (req.body.senha != "") {
    bd.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_professor", { error, professor: professor1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_professor", {
          error,
          professor: professor1,
        });
      } else {
        bd.update_professor({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
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
  } else {
    bd.update_professor({
      matricula: req.body.matricula,
      usuario: req.body.usuario,
      celular: req.body.celular,
      residencial: req.body.residencial,
      senha: professor1.senha,
      matricula1: professor1.matricula,
    }).then((professor) => {
      if (professor === "error") {
        req.flash("error_msg", "Error no sistema tente novamente mais tarde");
        res.redirect("/admin/professor");
      } else {
        req.flash("sucess_msg", "Alteração do professor feita com sucesso");
        res.redirect("/admin/professor");
      }
    });
  }
});

/*alteracao do funcionario*/
router.get("/funcionario/alteracao/:matricula", (req, res) => {
  bd1.select_funcionario1(req.params.matricula).then((funcionario) => {
    if (funcionario === "vazio") {
      req.flash("error_msg", "funcionário não encontrado");
      res.redirect("/admin/funcionario");
    } else if (funcionario === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/funcionario");
    } else {
      funcionario = funcionario[0];
      funcionario1 = funcionario;
      res.render("admin/edicao_funcionario", { funcionario });
    }
  });
});

router.post("/funcionario/alteracao", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("admin/edicao_funcionario", {
      error,
      funcionario: funcionario1,
    });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("admin/edicao_funcionario", {
      error,
      funcionario: funcionario1,
    });
  } else if (
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("admin/edicao_funcionario", {
      error,
      funcionario: funcionario1,
    });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("admin/edicao_funcionario", {
      error,
      funcionario: funcionario1,
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.celular != funcionario1.telefone_celular &&
    req.body.residencial != funcionario1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else if (
                req.body.senha.length <= 7 ||
                req.body.senha2.length <= 7
              ) {
                error = "A senha deve ter mais do que 7 caracteres";
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else {
                bd1.select_senha(req.body.senha).then((msg) => {
                  if (msg) {
                    error = msg;
                    res.render("admin/edicao_funcionario", {
                      error,
                      funcionario: funcionario1,
                    });
                  } else {
                    bd1
                      .update_funcionario({
                        matricula: req.body.matricula,
                        usuario: req.body.usuario,
                        celular: req.body.celular,
                        residencial: req.body.residencial,
                        senha: req.body.senha,
                        matricula1: funcionario1.matricula,
                      })
                      .then((funcionario) => {
                        if (funcionario === "error") {
                          req.flash(
                            "error_msg",
                            "Error no sistema tente novamente mais tarde"
                          );
                          res.redirect("/admin/funcionario");
                        } else {
                          req.flash(
                            "sucess_msg",
                            "Alteração do funcionário feita com sucesso"
                          );
                          res.redirect("/admin/funcionario");
                        }
                      });
                  }
                });
              }
            });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.celular != funcionario1.telefone_celular &&
    req.body.residencial != funcionario1.telefone_residencial
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else {
                bd1
                  .update_funcionario({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    celular: req.body.celular,
                    residencial: req.body.residencial,
                    senha: funcionario1.senha,
                    matricula1: funcionario1.matricula,
                  })
                  .then((funcionario) => {
                    if (funcionario === "error") {
                      req.flash(
                        "error_msg",
                        "Error no sistema tente novamente mais tarde"
                      );
                      res.redirect("/admin/funcionario");
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Alteração do funcionário feita com sucesso"
                      );
                      res.redirect("/admin/funcionario");
                    }
                  });
              }
            });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.celular != funcionario1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else {
                bd1
                  .update_funcionario({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    celular: req.body.celular,
                    residencial: req.body.residencial,
                    senha: req.body.senha,
                    matricula1: funcionario1.matricula,
                  })
                  .then((funcionario) => {
                    if (funcionario === "error") {
                      req.flash(
                        "error_msg",
                        "Error no sistema tente novamente mais tarde"
                      );
                      res.redirect("/admin/funcionario");
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Alteração do funcionário feita com sucesso"
                      );
                      res.redirect("/admin/funcionario");
                    }
                  });
              }
            });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.residencial != funcionario1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else {
                bd1
                  .update_funcionario({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    celular: req.body.celular,
                    residencial: req.body.residencial,
                    senha: req.body.senha,
                    matricula1: funcionario1.matricula,
                  })
                  .then((funcionario) => {
                    if (funcionario === "error") {
                      req.flash(
                        "error_msg",
                        "Error no sistema tente novamente mais tarde"
                      );
                      res.redirect("/admin/funcionario");
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Alteração do funcionário feita com sucesso"
                      );
                      res.redirect("/admin/funcionario");
                    }
                  });
              }
            });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.celular != funcionario1.telefone_celular
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: funcionario1.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.residencial != funcionario1.telefone_residencial
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: funcionario1.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (
    req.body.matricula != funcionario1.matricula &&
    req.body.senha != ""
  ) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: req.body.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (req.body.matricula != funcionario1.matricula) {
    bd1.select_funcionario(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1
          .update_funcionario({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: funcionario1.senha,
            matricula1: funcionario1.matricula,
          })
          .then((funcionario) => {
            if (funcionario === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/funcionario");
            } else {
              req.flash(
                "sucess_msg",
                "Alteração do funcionário feita com sucesso"
              );
              res.redirect("/admin/funcionario");
            }
          });
      }
    });
  } else if (
    req.body.celular != funcionario1.telefone_celular &&
    req.body.residencial != funcionario1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd1.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("admin/edicao_funcionario", {
                  error,
                  funcionario: funcionario1,
                });
              } else {
                bd1
                  .update_funcionario({
                    matricula: req.body.matricula,
                    usuario: req.body.usuario,
                    celular: req.body.celular,
                    residencial: req.body.residencial,
                    senha: req.body.senha,
                    matricula1: funcionario1.matricula,
                  })
                  .then((funcionario) => {
                    if (funcionario === "error") {
                      req.flash(
                        "error_msg",
                        "Error no sistema tente novamente mais tarde"
                      );
                      res.redirect("/admin/funcionario");
                    } else {
                      req.flash(
                        "sucess_msg",
                        "Alteração do funcionário feita com sucesso"
                      );
                      res.redirect("/admin/funcionario");
                    }
                  });
              }
            });
          }
        });
      }
    });
  } else if (
    req.body.celular != funcionario1.telefone_celular &&
    req.body.residencial != funcionario1.telefone_residencial
  ) {
    bd1.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: funcionario1.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (
    req.body.celular != funcionario1.telefone_celular &&
    req.body.senha != ""
  ) {
    bd1.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: req.body.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (req.body.celular != funcionario1.telefone_celular) {
    bd1.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1
          .update_funcionario({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: funcionario1.senha,
            matricula1: funcionario1.matricula,
          })
          .then((funcionario) => {
            if (funcionario === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/funcionario");
            } else {
              req.flash(
                "sucess_msg",
                "Alteração do funcionário feita com sucesso"
              );
              res.redirect("/admin/funcionario");
            }
          });
      }
    });
  } else if (
    req.body.residencial != funcionario1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd1.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("admin/edicao_funcionario", {
              error,
              funcionario: funcionario1,
            });
          } else {
            bd1
              .update_funcionario({
                matricula: req.body.matricula,
                usuario: req.body.usuario,
                celular: req.body.celular,
                residencial: req.body.residencial,
                senha: req.body.senha,
                matricula1: funcionario1.matricula,
              })
              .then((funcionario) => {
                if (funcionario === "error") {
                  req.flash(
                    "error_msg",
                    "Error no sistema tente novamente mais tarde"
                  );
                  res.redirect("/admin/funcionario");
                } else {
                  req.flash(
                    "sucess_msg",
                    "Alteração do funcionário feita com sucesso"
                  );
                  res.redirect("/admin/funcionario");
                }
              });
          }
        });
      }
    });
  } else if (req.body.residencial != funcionario1.telefone_residencial) {
    bd1.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1
          .update_funcionario({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: funcionario1.senha,
            matricula1: funcionario1.matricula,
          })
          .then((funcionario) => {
            if (funcionario === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/funcionario");
            } else {
              req.flash(
                "sucess_msg",
                "Alteração do funcionário feita com sucesso"
              );
              res.redirect("/admin/funcionario");
            }
          });
      }
    });
  } else if (req.body.senha != "") {
    bd1.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("admin/edicao_funcionario", {
          error,
          funcionario: funcionario1,
        });
      } else {
        bd1
          .update_funcionario({
            matricula: req.body.matricula,
            usuario: req.body.usuario,
            celular: req.body.celular,
            residencial: req.body.residencial,
            senha: req.body.senha,
            matricula1: funcionario1.matricula,
          })
          .then((funcionario) => {
            if (funcionario === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/funcionario");
            } else {
              req.flash(
                "sucess_msg",
                "Alteração do funcionário feita com sucesso"
              );
              res.redirect("/admin/funcionario");
            }
          });
      }
    });
  } else {
    bd1
      .update_funcionario({
        matricula: req.body.matricula,
        usuario: req.body.usuario,
        celular: req.body.celular,
        residencial: req.body.residencial,
        senha: funcionario1.senha,
        matricula1: funcionario1.matricula,
      })
      .then((funcionario) => {
        if (funcionario === "error") {
          req.flash("error_msg", "Error no sistema tente novamente mais tarde");
          res.redirect("/admin/funcionario");
        } else {
          req.flash("sucess_msg", "Alteração do funcionário feita com sucesso");
          res.redirect("/admin/funcionario");
        }
      });
  }
});

/*alteracao do chamado*/
router.get("/chamado/alteracao/:id", (req, res) => {
  bd3.select_chamado1(req.params.id).then((chamado) => {
    if (chamado === "vazio") {
      req.flash("error_msg", "Chamado não encontrado");
      res.redirect("/admin/chamado");
    } else if (chamado === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/chamado");
    } else {
      chamado = chamado[0];
      chamado1 = chamado;
      console.log(chamado1);
      res.render("admin/edicao_chamado", { chamado });
    }
  });
});

router.post("/chamado/alteracao", (req, res) => {
  if (chamado1.nome_aluno != null) {
    alteracaoAlunoImagem(req, res, (err) => {
      if (req.body.alterar === "Alterar chamado") {
        if (typeof req.files[0] === "undefined") {
          req.files[0] = { filename: chamado1.img1 };
          req.files[1] = { filename: chamado1.img2 };
          req.files[2] = { filename: chamado1.img3 };
        } else if (typeof req.files[1] === "undefined") {
          req.files[1] = { filename: chamado1.img2 };
          req.files[2] = { filename: chamado1.img3 };
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else if (typeof req.files[2] === "undefined") {
          req.files[2] = { filename: chamado1.img3 };
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
            if (err) {
              console.log(err);
            }
          });
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img2, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else if (typeof req.files[2] !== "undefined") {
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
            if (err) {
              console.log(err);
            }
          });
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img2, (err) => {
            if (err) {
              console.log(err);
            }
          });
          fs.unlink("./public/upload/chamado_aluno/" + chamado1.img3, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        if (err instanceof multer.MulterError) {
          err = "Envio de arquivos invalida";
          res.setTimeout(480000);
          res.render("admin/edicao_chamado", { error: err });
        } else if (err) {
          res.setTimeout(480000);
          res.render("admin/edicao_chamado", { error: err });
        } else {
          bd3
            .update_chamado({
              titulo: req.body.titulo,
              assunto: req.body.assunto,
              statusd: req.body.status,
              nivel: req.body.nivel,
              prioridade: req.body.prioridade,
              img1: req.files[0].filename,
              img2: req.files[1].filename,
              img3: req.files[2].filename,
              descricao: req.body.descricao,
              id: chamado1.id,
            })
            .then((error) => {
              if (error === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/admin/chamado");
              } else {
                req.flash(
                  "sucess_msg",
                  "Alteração do chamado feita com sucesso"
                );
                res.redirect("/admin/chamado");
              }
            });
        }
      } else if (req.body.deletar === "Deletar imagens") {
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
          if (err) {
            console.log(err);
          }
        });
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img2, (err) => {
          if (err) {
            console.log(err);
          }
        });
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img3, (err) => {
          if (err) {
            console.log(err);
          }
        });
        bd3
          .update_imagem({
            img1: null,
            img2: null,
            img3: null,
            id: chamado1.id,
          })
          .then((error) => {
            if (error === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/chamado");
            } else {
              req.flash("sucess_msg", "Exclusão das imagens feita com sucesso");
              res.redirect("/admin/chamado/alteracao/" + chamado1.id);
            }
          });
      }
    });
  } else {
    alteracaoProfessorImagem(req, res, (err) => {
      if (req.body.alterar === "Alterar chamado") {
        if (typeof req.files[0] === "undefined") {
          req.files[0] = { filename: chamado1.img1 };
          req.files[1] = { filename: chamado1.img2 };
          req.files[2] = { filename: chamado1.img3 };
        } else if (typeof req.files[1] === "undefined") {
          req.files[1] = { filename: chamado1.img2 };
          req.files[2] = { filename: chamado1.img3 };
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img1,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        } else if (typeof req.files[2] === "undefined") {
          req.files[2] = { filename: chamado1.img3 };
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img1,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img2,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        } else if (typeof req.files[2] !== "undefined") {
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img1,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img2,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          fs.unlink(
            "./public/upload/chamado_professor/" + chamado1.img3,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }

        if (err instanceof multer.MulterError) {
          err = "Envio de arquivos invalida";
          res.setTimeout(480000);
          res.render("admin/edicao_chamado", { error: err });
        } else if (err) {
          res.setTimeout(480000);
          res.render("admin/edicao_chamado", { error: err });
        } else {
          bd3
            .update_chamado({
              titulo: req.body.titulo,
              assunto: req.body.assunto,
              statusd: req.body.status,
              nivel: req.body.nivel,
              prioridade: req.body.prioridade,
              img1: req.files[0].filename,
              img2: req.files[1].filename,
              img3: req.files[2].filename,
              descricao: req.body.descricao,
              id: chamado1.id,
            })
            .then((error) => {
              if (error === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/admin/chamado");
              } else {
                req.flash(
                  "sucess_msg",
                  "Alteração do chamado feita com sucesso"
                );
                res.redirect("/admin/chamado");
              }
            });
        }
      } else if (req.body.deletar === "Deletar imagens") {
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img1,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img2,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img3,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        bd3
          .update_imagem({
            img1: null,
            img2: null,
            img3: null,
            id: chamado1.id,
          })
          .then((error) => {
            if (error === "error") {
              req.flash(
                "error_msg",
                "Error no sistema tente novamente mais tarde"
              );
              res.redirect("/admin/chamado");
            } else {
              req.flash("sucess_msg", "Exclusão das imagens feita com sucesso");
              res.redirect("/admin/chamado/alteracao/" + chamado1.id);
            }
          });
      }
    });
  }
});

/*exclusão do professor*/
router.get("/professor/exclusao/:matricula", (req, res) => {
  bd.delete_professor(req.params.matricula).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/professor");
    } else {
      req.flash("sucess_msg", "Exclusão do professor feita com sucesso");
      res.redirect("/admin/professor");
    }
  });
});

/*exclusão do chamado*/
router.get("/chamado/exclusao/:id", (req, res) => {
  bd3.select_usuario_imagem(req.params.id).then((usuario) => {
    if (usuario === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/chamado");
    } else {
      usuario = usuario[0];
      chamado1 = usuario;
      console.log(chamado1);
    }
  });
  bd3.delete_chamado(req.params.id).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/chamado");
    } else if (chamado1.nome_aluno !== null) {
      fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.unlink("./public/upload/chamado_aluno/" + chamado1.img2, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.unlink("./public/upload/chamado_aluno/" + chamado1.img3, (err) => {
        if (err) {
          console.log(err);
        }
      });
      req.flash("sucess_msg", "Exclusão do chamado feita com sucesso");
      res.redirect("/admin/chamado");
    } else {
      fs.unlink("./public/upload/chamado_professor/" + chamado1.img1, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.unlink("./public/upload/chamado_professor/" + chamado1.img2, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.unlink("./public/upload/chamado_professor/" + chamado1.img3, (err) => {
        if (err) {
          console.log(err);
        }
      });
      req.flash("sucess_msg", "Exclusão do chamado feita com sucesso");
      res.redirect("/admin/chamado");
    }
  });
});

/*exclusao do aluno*/
router.get("/aluno/exclusao/:matricula", (req, res) => {
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

/*exclusao do funcionario*/
router.get("/funcionario/exclusao/:matricula", (req, res) => {
  bd1.delete_funcionario(req.params.matricula).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/admin/funcionario");
    } else {
      req.flash("sucess_msg", "Exclusão do funcionário feita com sucesso");
      res.redirect("/admin/funcionario");
    }
  });
});
module.exports = router;
