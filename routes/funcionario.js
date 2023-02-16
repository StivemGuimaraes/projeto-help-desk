const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");
const bd1 = require("../models/bd_professor");
const bd2 = require("../models/bd_chamado");
const bd3 = require("../models/bd_funcionario");
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
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (req.body.celular.length < 15) {
    error = "Número de celular invalido";
    res.render("funcionario/cadastro_aluno", { error, dados });
  } else if (req.body.residencial) {
    if (req.body.residencial.length < 14) {
      error = "Número residencial invalido";
      res.render("funcionario/cadastro_aluno", { error, dados });
    }
  }
  if (
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/cadastro_aluno", { error, dados });
      } else {
        bd1.select_professor(req.body.matricula).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/cadastro_aluno", { error, dados });
          } else {
            bd3.select_funcionario(req.body.matricula).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_aluno", { error, dados });
              } else {
                bd.select_celular(req.body.celular).then((msg) => {
                  if (msg) {
                    error = msg;
                    res.render("funcionario/cadastro_aluno", {
                      error,
                      dados,
                    });
                  } else {
                    bd1.select_celular(req.body.celular).then((msg) => {
                      if (msg) {
                        error = msg;
                        res.render("funcionario/cadastro_aluno", {
                          error,
                          dados,
                        });
                      } else {
                        bd3.select_celular(req.body.celular).then((msg) => {
                          if (msg) {
                            error = msg;
                            res.render("funcionario/cadastro_aluno", {
                              error,
                              dados,
                            });
                          } else {
                            bd.select_residencial(req.body.residencial).then(
                              (msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("funcionario/cadastro_aluno", {
                                    error,
                                    dados,
                                  });
                                } else {
                                  bd1
                                    .select_residencial(req.body.residencial)
                                    .then((msg) => {
                                      if (msg) {
                                        error = msg;
                                        res.render(
                                          "funcionario/cadastro_aluno",
                                          {
                                            error,
                                            dados,
                                          }
                                        );
                                      } else {
                                        bd3
                                          .select_residencial(
                                            req.body.residencial
                                          )
                                          .then((msg) => {
                                            if (msg) {
                                              error = msg;
                                              res.render(
                                                "funcionario/cadastro_aluno",
                                                { error, dados }
                                              );
                                            } else {
                                              bd.select_senha(
                                                req.body.senha
                                              ).then((msg) => {
                                                if (msg) {
                                                  error = msg;
                                                  res.render(
                                                    "funcionario/cadastro_aluno",
                                                    {
                                                      error,
                                                      dados,
                                                    }
                                                  );
                                                } else {
                                                  bd1
                                                    .select_senha(
                                                      req.body.senha
                                                    )
                                                    .then((msg) => {
                                                      if (msg) {
                                                        error = msg;
                                                        res.render(
                                                          "funcionario/cadastro_aluno",
                                                          { error, dados }
                                                        );
                                                      } else {
                                                        bd3
                                                          .select_senha(
                                                            req.body.senha
                                                          )
                                                          .then((msg) => {
                                                            if (msg) {
                                                              error = msg;
                                                              res.render(
                                                                "funcionario/cadastro_aluno",
                                                                {
                                                                  error,
                                                                  dados,
                                                                }
                                                              );
                                                            } else {
                                                              bd.insert_aluno({
                                                                matricula:
                                                                  req.body
                                                                    .matricula,
                                                                usuario:
                                                                  req.body
                                                                    .usuario,
                                                                celular:
                                                                  req.body
                                                                    .celular,
                                                                residencial:
                                                                  req.body
                                                                    .residencial,
                                                                senha:
                                                                  req.body
                                                                    .senha,
                                                              }).then((msg) => {
                                                                if (msg) {
                                                                  error = msg;
                                                                  res.render(
                                                                    "funcionario/cadastro_aluno",
                                                                    {
                                                                      error,
                                                                      dados,
                                                                    }
                                                                  );
                                                                } else {
                                                                  var sucesso =
                                                                    "aluno cadastrado com sucesso";
                                                                  res.render(
                                                                    "funcionario/cadastro_aluno",
                                                                    {
                                                                      sucesso,
                                                                    }
                                                                  );
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
                                      }
                                    });
                                }
                              }
                            );
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
      }
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
    !req.body.celular ||
    typeof req.body.celular === undefined ||
    req.body.celular === null
  ) {
    error = "Telefone celular invalido";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (req.body.celular.length < 15) {
    error = "Número de celular invalido";
    res.render("funcionario/cadastro_professor", { error, dados });
  } else if (req.body.residencial) {
    if (req.body.residencial.length < 14) {
      error = "Número residencial invalido";
      res.render("funcionario/cadastro_professor", { error, dados });
    }
  }
  if (
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
    bd.select_aluno(req.body.matricula).then((msg) => {
      if (msg) {
        error = msg;
        res.render("funcionario/cadastro_professor", { error, dados });
      } else {
        bd1.select_professor(req.body.matricula).then((msg) => {
          if (msg) {
            error = msg;
            res.render("funcionario/cadastro_professor", { error, dados });
          } else {
            bd3.select_funcionario(req.body.matricula).then((msg) => {
              if (msg) {
                error = msg;
                res.render("funcionario/cadastro_professor", { error, dados });
              } else {
                bd.select_celular(req.body.celular).then((msg) => {
                  if (msg) {
                    error = msg;
                    res.render("funcionario/cadastro_professor", {
                      error,
                      dados,
                    });
                  } else {
                    bd1.select_celular(req.body.celular).then((msg) => {
                      if (msg) {
                        error = msg;
                        res.render("funcionario/cadastro_professor", {
                          error,
                          dados,
                        });
                      } else {
                        bd3.select_celular(req.body.celular).then((msg) => {
                          if (msg) {
                            error = msg;
                            res.render("funcionario/cadastro_professor", {
                              error,
                              dados,
                            });
                          } else {
                            bd.select_residencial(req.body.residencial).then(
                              (msg) => {
                                if (msg) {
                                  error = msg;
                                  res.render("funcionario/cadastro_professor", {
                                    error,
                                    dados,
                                  });
                                } else {
                                  bd1
                                    .select_residencial(req.body.residencial)
                                    .then((msg) => {
                                      if (msg) {
                                        error = msg;
                                        res.render(
                                          "funcionario/cadastro_professor",
                                          {
                                            error,
                                            dados,
                                          }
                                        );
                                      } else {
                                        bd3
                                          .select_residencial(
                                            req.body.residencial
                                          )
                                          .then((msg) => {
                                            if (msg) {
                                              error = msg;
                                              res.render(
                                                "funcionario/cadastro_professor",
                                                { error, dados }
                                              );
                                            } else {
                                              bd.select_senha(
                                                req.body.senha
                                              ).then((msg) => {
                                                if (msg) {
                                                  error = msg;
                                                  res.render(
                                                    "funcionario/cadastro_professor",
                                                    {
                                                      error,
                                                      dados,
                                                    }
                                                  );
                                                } else {
                                                  bd1
                                                    .select_senha(
                                                      req.body.senha
                                                    )
                                                    .then((msg) => {
                                                      if (msg) {
                                                        error = msg;
                                                        res.render(
                                                          "funcionario/cadastro_professor",
                                                          { error, dados }
                                                        );
                                                      } else {
                                                        bd3
                                                          .select_senha(
                                                            req.body.senha
                                                          )
                                                          .then((msg) => {
                                                            if (msg) {
                                                              error = msg;
                                                              res.render(
                                                                "funcionario/cadastro_professor",
                                                                {
                                                                  error,
                                                                  dados,
                                                                }
                                                              );
                                                            } else {
                                                              bd1
                                                                .insert_professor(
                                                                  {
                                                                    matricula:
                                                                      req.body
                                                                        .matricula,
                                                                    usuario:
                                                                      req.body
                                                                        .usuario,
                                                                    celular:
                                                                      req.body
                                                                        .celular,
                                                                    residencial:
                                                                      req.body
                                                                        .residencial,
                                                                    senha:
                                                                      req.body
                                                                        .senha,
                                                                  }
                                                                )
                                                                .then((msg) => {
                                                                  if (msg) {
                                                                    error = msg;
                                                                    res.render(
                                                                      "funcionario/cadastro_professor",
                                                                      {
                                                                        error,
                                                                        dados,
                                                                      }
                                                                    );
                                                                  } else {
                                                                    var sucesso =
                                                                      "Professor cadastrado com sucesso";
                                                                    res.render(
                                                                      "funcionario/cadastro_professor",
                                                                      {
                                                                        sucesso,
                                                                      }
                                                                    );
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
                                      }
                                    });
                                }
                              }
                            );
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
      }
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

/*seleção de dados do chamado*/
router.get("/chamado", (req, res) => {
  bd2.select_chamadoAll().then((chamado) => {
    if (chamado === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("funcionario/chamado", { error_mensagem });
    } else if (chamado === "vazio") {
      var aviso_mensagem = "!!! Nenhum chamado cadastrado no sistema !!!";
      res.render("funcionario/chamado", { aviso_mensagem });
    } else {
      chamado.forEach((valor, i) => {
        if (chamado[i].statusd == "Aberto") {
          chamado[i].i1 = "algo";
        } else if (chamado[i].statusd == "Andamento") {
          chamado[i].i2 = "algo";
        } else if (chamado[i].statusd == "Fechado") {
          chamado[i].i3 = "algo";
        }
      });
      res.render("funcionario/chamado", { chamado });
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

/*alteração de dados do chamado*/
router.get("/chamado/alteracao/:id", (req, res) => {
  bd2.select_chamado1(req.params.id).then((chamado) => {
    if (chamado === "vazio") {
      req.flash("error_msg", "Chamado não encontrado");
      res.redirect("/funcionario/chamado");
    } else if (chamado === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/funcionario/chamado");
    } else {
      chamado = chamado[0];
      chamado1 = chamado;
      console.log(chamado1);
      res.render("funcionario/edicao_chamado", { chamado });
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
          res.render("funcionario/edicao_chamado", { error: err });
        } else if (err) {
          res.setTimeout(480000);
          res.render("funcionario/edicao_chamado", { error: err });
        } else {
          bd2
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
                res.redirect("/funcionario/chamado");
              } else {
                req.flash(
                  "sucess_msg",
                  "Alteração do chamado feita com sucesso"
                );
                res.redirect("/funcionario/chamado");
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
        bd2
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
              res.redirect("/funcionario/chamado");
            } else {
              req.flash("sucess_msg", "Exclusão das imagens feita com sucesso");
              res.redirect("/funcionario/chamado/alteracao/" + chamado1.id);
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
          res.render("funcionario/edicao_chamado", { error: err });
        } else if (err) {
          res.setTimeout(480000);
          res.render("funcionario/edicao_chamado", { error: err });
        } else {
          bd2
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
                res.redirect("/funcionario/chamado");
              } else {
                req.flash(
                  "sucess_msg",
                  "Alteração do chamado feita com sucesso"
                );
                res.redirect("/funcionario/chamado");
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
        bd2
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
              res.redirect("/funcionario/chamado");
            } else {
              req.flash("sucess_msg", "Exclusão das imagens feita com sucesso");
              res.redirect("/funcionario/chamado/alteracao/" + chamado1.id);
            }
          });
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

/*exclusão do chamado*/
router.get("/chamado/exclusao/:id", (req, res) => {
  bd2.select_usuario_imagem(req.params.id).then((usuario) => {
    if (usuario === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/funcionario/chamado");
    } else {
      usuario = usuario[0];
      chamado1 = usuario;
      if (typeof chamado1 === "undefined") {
        chamado1 = {
          img1: null,
          img2: null,
          img3: null,
        };
      }
      console.log(chamado1);
    }
  });
  bd2.delete_chamado(req.params.id).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/funcionario/chamado");
    } else if (chamado1.nome_aluno !== null) {
      if (chamado1.img1 != null) {
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      if (chamado1.img2 != null) {
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img2, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      if (chamado1.img3 != null) {
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img3, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      req.flash("sucess_msg", "Exclusão do chamado feita com sucesso");
      res.redirect("/funcionario/chamado");
    } else {
      if (chamado1.img1 != null) {
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img1,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      if (chamado1.img2 != null) {
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img2,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      if (chamado1.img3 != null) {
        fs.unlink(
          "./public/upload/chamado_professor/" + chamado1.img3,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      req.flash("sucess_msg", "Exclusão do chamado feita com sucesso");
      res.redirect("/funcionario/chamado");
    }
  });
});
module.exports = router;
