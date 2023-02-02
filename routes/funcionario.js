const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");
const bd1 = require("../models/bd_professor");
var aluno1;
var professor1;
var chamado1;

router.get("/", (req, res) => {
  res.render("funcionario/index");
});

/*inclusão de dados do aluno*/
router.get("/cadastrar-aluno", (req, res) => {
  res.render("funcionario/cadastro_aluno");
});

router.post("/cadastrar-aluno/nova", (req, res) => {
  var dados = {
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    celular: req.body.celular,
    residencial: req.body.residencial,
    senha: req.body.senha,
    senha2: req.body.senha2,
  };
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuario invalido";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else {
    bd.select_aluno(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("funcionario/cadastro_aluno", { error, dados });
        } else {
          bd.select_celular(req.body.celular)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_aluno", { error, dados });
              } else {
                bd.select_residencial(req.body.residencial)
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("funcionario/cadastro_aluno", {
                        error,
                        dados,
                      });
                    } else {
                      bd.select_senha(req.body.senha)
                        .then((msg) => {
                          if (msg) {
                            error = msg;
                            res.render("funcionario/cadastro_aluno", {
                              error,
                              dados,
                            });
                          } else {
                            bd.insert_aluno({
                              matricula: req.body.matricula,
                              usuario: req.body.usuario,
                              celular: req.body.celular,
                              residencial: req.body.residencial,
                              senha: req.body.senha,
                            })
                              .then((msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("funcionario/cadastro_aluno", {
                                    error,
                                    dados,
                                  });
                                } else {
                                  var sucesso = "Aluno cadastrado com sucesso";
                                  res.render("funcionario/cadastro_aluno", {
                                    sucesso,
                                  });
                                }
                              })
                              .catch((error1) => {
                                console.log("deu error", error1);
                                error =
                                  "Error no sistema tente novamente mais tarde";
                                res.render("funcionario/cadastro_aluno", {
                                  error,
                                });
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

/*inclusão de dados do professor*/
router.get("/cadastrar-professor", (req, res) => {
  res.render("funcionario/cadastro_professor");
});

router.post("/cadastrar-professor/nova", (req, res) => {
  var dados = {
    matricula: req.body.matricula,
    usuario: req.body.usuario,
    celular: req.body.celular,
    residencial: req.body.residencial,
    senha: req.body.senha,
    senha2: req.body.senha2,
  };
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else {
    bd1
      .select_professor(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("funcionario/cadastro_professor", { error, dados });
        } else {
          bd1
            .select_celular(req.body.celular)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_professor", { error, dados });
              } else {
                bd1
                  .select_residencial(req.body.residencial)
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("funcionario/cadastro_professor", {
                        error,
                        dados,
                      });
                    } else {
                      bd1
                        .select_senha(req.body.senha)
                        .then((msg) => {
                          if (msg) {
                            error = msg;
                            res.render("funcionario/cadastro_professor", {
                              error,
                              dados,
                            });
                          } else {
                            bd1
                              .insert_professor({
                                matricula: req.body.matricula,
                                usuario: req.body.usuario,
                                celular: req.body.celular,
                                residencial: req.body.residencial,
                                senha: req.body.senha,
                              })
                              .then((msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("funcionario/cadastro_professor", {
                                    error,
                                    dados,
                                  });
                                } else {
                                  var sucesso =
                                    "Professor cadastrado com sucesso";
                                  res.render("funcionario/cadastro_professor", {
                                    sucesso,
                                  });
                                }
                              })
                              .catch((error1) => {
                                console.log("deu error", error1);
                                error =
                                  "Error no sistema tente novamente mais tarde";
                                res.render("funcionario/cadastro_professor", {
                                  error,
                                });
                              });
                          }
                        })
                        .catch((error1) => {
                          console.log("deu error", error1);
                          error = "Error no sistema tente novamente mais tarde";
                          res.render("funcionario/cadastro_professor", {
                            error,
                          });
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
      })
      .catch((error1) => {
        console.log("deu error", error1);
        error = "Error no sistema tente novamente mais tarde";
        res.render("funcionario/cadastro_professor", { error });
      });
  }
});

/*seleção de dados do professor*/
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

/*seleção de dados do aluno*/
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

/*alteração de dados do aluno*/
router.get("/aluno/alteracao/:matricula", (req, res) => {
  bd.select_aluno1(req.params.matricula).then((aluno) => {
    if (aluno === "vazio") {
      req.flash("error_msg", "Aluno não encontrado");
      res.redirect("/funcionario/aluno");
    } else if (aluno === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("funcionario/aluno");
    } else {
      aluno = aluno[0];
      aluno1 = aluno;
      res.render("funcionario/edicao_aluno", { aluno });
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
    res.render("funcionario/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("funcionario/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("funcionario/edicao_aluno", {
      error,
      aluno: aluno1,
    });
  } else if (
    req.body.matricula != aluno1.matricula &&
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else if (
                req.body.senha.length <= 7 ||
                req.body.senha2.length <= 7
              ) {
                error = "A senha deve ter mais do que 7 caracteres";
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else {
                bd.select_senha(req.body.senha).then((msg) => {
                  if (msg) {
                    error = msg;
                    res.render("funcionario/edicao_aluno", {
                      error,
                      aluno: aluno1,
                    });
                  } else {
                    bd.delete_update_aluno({
                      matricula: req.body.matricula,
                      usuario: req.body.usuario,
                      celular: req.body.celular,
                      residencial: req.body.residencial,
                      senha: req.body.senha,
                      matricula1: aluno1.matricula,
                    }).then((aluno) => {
                      if (aluno === "error") {
                        req.flash(
                          "error_msg",
                          "Error no sistema tente novamente mais tarde"
                        );
                        res.redirect("/funcionario/aluno");
                      } else {
                        req.flash(
                          "sucess_msg",
                          "Alteração do aluno feita com sucesso"
                        );
                        res.redirect("/funcionario/aluno");
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.select_residencial(req.body.residencial).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else {
                bd.delete_update_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  celular: req.body.celular,
                  residencial: req.body.residencial,
                  senha: aluno1.senha,
                  matricula1: aluno1.matricula,
                }).then((aluno) => {
                  if (aluno === "error") {
                    req.flash(
                      "error_msg",
                      "Error no sistema tente novamente mais tarde"
                    );
                    res.redirect("/funcionario/aluno");
                  } else {
                    req.flash(
                      "sucess_msg",
                      "Alteração do aluno feita com sucesso"
                    );
                    res.redirect("/funcionario/aluno");
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else {
                bd.delete_update_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  celular: req.body.celular,
                  residencial: req.body.residencial,
                  senha: req.body.senha,
                  matricula1: aluno1.matricula,
                }).then((aluno) => {
                  if (aluno === "error") {
                    req.flash(
                      "error_msg",
                      "Error no sistema tente novamente mais tarde"
                    );
                    res.redirect("/funcionario/aluno");
                  } else {
                    req.flash(
                      "sucess_msg",
                      "Alteração do aluno feita com sucesso"
                    );
                    res.redirect("/funcionario/aluno");
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else {
                bd.delete_update_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  celular: req.body.celular,
                  residencial: req.body.residencial,
                  senha: req.body.senha,
                  matricula1: aluno1.matricula,
                }).then((aluno) => {
                  if (aluno === "error") {
                    req.flash(
                      "error_msg",
                      "Error no sistema tente novamente mais tarde"
                    );
                    res.redirect("/funcionario/aluno");
                  } else {
                    req.flash(
                      "sucess_msg",
                      "Alteração do aluno feita com sucesso"
                    );
                    res.redirect("/funcionario/aluno");
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.select_celular(req.body.celular).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.delete_update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: aluno1.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.delete_update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: aluno1.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
              }
            });
          }
        });
      }
    });
  } else if (req.body.matricula != aluno1.matricula && req.body.senha != "") {
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.delete_update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: req.body.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
              }
            });
          }
        });
      }
    });
  } else if (req.body.matricula != aluno1.matricula) {
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.delete_update_aluno({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: aluno1.senha,
          matricula1: aluno1.matricula,
        }).then((aluno) => {
          if (aluno === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/funcionario/aluno");
          } else {
            req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
            res.redirect("/funcionario/aluno");
          }
        });
      }
    });
  } else if (
    req.body.celular != aluno1.telefone_celular &&
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else if (
            req.body.senha.length <= 7 ||
            req.body.senha2.length <= 7
          ) {
            error = "A senha deve ter mais do que 7 caracteres";
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.select_senha(req.body.senha).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/edicao_aluno", {
                  error,
                  aluno: aluno1,
                });
              } else {
                bd.update_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  celular: req.body.celular,
                  residencial: req.body.residencial,
                  senha: req.body.senha,
                  matricula1: aluno1.matricula,
                }).then((aluno) => {
                  if (aluno === "error") {
                    req.flash(
                      "error_msg",
                      "Error no sistema tente novamente mais tarde"
                    );
                    res.redirect("/funcionario/aluno");
                  } else {
                    req.flash(
                      "sucess_msg",
                      "Alteração do aluno feita com sucesso"
                    );
                    res.redirect("/funcionario/aluno");
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
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.select_residencial(req.body.residencial).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: aluno1.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
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
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: req.body.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
              }
            });
          }
        });
      }
    });
  } else if (req.body.celular != aluno1.telefone_celular) {
    bd.select_celular(req.body.celular).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.update_aluno({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: aluno1.senha,
          matricula1: aluno1.matricula,
        }).then((aluno) => {
          if (aluno === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/funcionario/aluno");
          } else {
            req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
            res.redirect("/funcionario/aluno");
          }
        });
      }
    });
  } else if (
    req.body.residencial != aluno1.telefone_residencial &&
    req.body.senha != ""
  ) {
    bd.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.select_senha(req.body.senha).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/edicao_aluno", {
              error,
              aluno: aluno1,
            });
          } else {
            bd.update_aluno({
              matricula: req.body.matricula,
              usuario: req.body.usuario,
              celular: req.body.celular,
              residencial: req.body.residencial,
              senha: req.body.senha,
              matricula1: aluno1.matricula,
            }).then((aluno) => {
              if (aluno === "error") {
                req.flash(
                  "error_msg",
                  "Error no sistema tente novamente mais tarde"
                );
                res.redirect("/funcionario/aluno");
              } else {
                req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
                res.redirect("/funcionario/aluno");
              }
            });
          }
        });
      }
    });
  } else if (req.body.residencial != aluno1.telefone_residencial) {
    bd.select_residencial(req.body.residencial).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else {
        bd.update_aluno({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: aluno1.senha,
          matricula1: aluno1.matricula,
        }).then((aluno) => {
          if (aluno === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/funcionario/aluno");
          } else {
            req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
            res.redirect("/funcionario/aluno");
          }
        });
      }
    });
  } else if (req.body.senha != "") {
    bd.select_senha(req.body.senha).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/edicao_aluno", { error, aluno: aluno1 });
      } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
        error = "A senha deve ter mais do que 7 caracteres";
        res.render("funcionario/edicao_aluno", {
          error,
          aluno: aluno1,
        });
      } else {
        bd.update_aluno({
          matricula: req.body.matricula,
          usuario: req.body.usuario,
          celular: req.body.celular,
          residencial: req.body.residencial,
          senha: req.body.senha,
          matricula1: aluno1.matricula,
        }).then((aluno) => {
          if (aluno === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/funcionario/aluno");
          } else {
            req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
            res.redirect("/funcionario/aluno");
          }
        });
      }
    });
  } else {
    bd.update_aluno({
      matricula: req.body.matricula,
      usuario: req.body.usuario,
      celular: req.body.celular,
      residencial: req.body.residencial,
      senha: aluno1.senha,
      matricula1: aluno1.matricula,
    }).then((aluno) => {
      if (aluno === "error") {
        req.flash("error_msg", "Error no sistema tente novamente mais tarde");
        res.redirect("/funcionario/aluno");
      } else {
        req.flash("sucess_msg", "Alteração do aluno feita com sucesso");
        res.redirect("/funcionario/aluno");
      }
    });
  }
});

/*exclusao do aluno*/
router.get("/aluno/exclusao/:matricula", (req, res) => {
  bd.delete_aluno(req.params.matricula).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/funcionario/aluno");
    } else {
      req.flash("sucess_msg", "Exclusão do aluno feita com sucesso");
      res.redirect("/funcionario/aluno");
    }
  });
});
module.exports = router;
