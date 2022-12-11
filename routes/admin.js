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
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
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
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
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
  } else if (req.body.senha.length < 7 || req.body.senha2.length < 7) {
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
router.get("/chamado", (req, res) => {
  bd3.select_chamadoAll().then((chamado) => {
    if (chamado === "Error") {
      res.render("admin/chamado");
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
    } else {
      res.render("admin/chamado", { chamado });
    }
  });
});

router.get("/relatorios", (req, res) => {
  res.render("admin/relatorios");
});

router.get("/funcionario", (req, res) => {
  bd1.select_funcionarioAll().then((funcionario) => {
    if (funcionario === "Error") {
      res.render("admin/funcionarios");
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
    } else {
      res.render("admin/funcionarios", { funcionario });
    }
  });
});

router.get("/aluno", (req, res) => {
  bd2.select_alunoAll().then((aluno) => {
    if (aluno === "Error") {
      res.render("admin/alunos");
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
    } else {
      res.render("admin/alunos", { aluno });
    }
  });
});

router.get("/professor", (req, res) => {
  bd.select_professorAll().then((professor) => {
    if (professor) {
      res.render("admin/professores");
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
    } else {
      res.render("admin/professores", { professor });
    }
  });
});

module.exports = router;
