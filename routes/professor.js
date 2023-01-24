const express = require("express");
const router = express.Router();
const bd = require("../models/bd_aluno");
const bd1 = require("../models/bd_chamado");
const upload = require("../config/multer");
const multer = require("multer");
const uploadChamadoProfessor = upload
  .upload_chamado_professor()
  .array("imagem_chamado1", 3);

router.get("/", (req, res) => {
  res.render("professor/index");
});
router.get("/cadastrar-aluno", (req, res) => {
  res.render("professor/cadastro_aluno");
});
router.post("/cadastrar-aluno/nova", (req, res) => {
  var error;
  if (
    !req.body.matricula ||
    typeof req.body.matricula === undefined ||
    req.body.matricula === null
  ) {
    error = "Matricula invalida";
    res.render("professor/cadastro_aluno", { error });
  } else if (
    !req.body.usuario ||
    typeof req.body.usuario === undefined ||
    req.body.usuario === null
  ) {
    error = "Usuário invalido";
    res.render("professor/cadastro_aluno", { error });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("professor/cadastro_aluno", { error });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("professor/cadastro_aluno", { error });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("professor/cadastro_aluno", { error });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("professor/cadastro_aluno", { error });
  } else {
    bd.select_aluno(req.body.matricula)
      .then((msg) => {
        if (msg) {
          error = msg;
          res.render("professor/cadastro_aluno", { error });
        } else {
          bd.select_senha(req.body.senha)
            .then((msg) => {
              if (msg) {
                error = msg;
                res.render("professor/cadastro_aluno", { error });
              } else {
                bd.insert_aluno({
                  matricula: req.body.matricula,
                  usuario: req.body.usuario,
                  senha: req.body.senha,
                })
                  .then((msg) => {
                    if (msg) {
                      error = msg;
                      res.render("professor/cadastro_aluno", { error });
                    } else {
                      req.flash("sucess_msg", "Aluno cadastrado com sucesso");
                      res.redirect("/professor/aluno");
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

router.get("/criar-chamado", (req, res) => {
  res.render("professor/criar_chamado");
});

router.post("/criar-chamado/nova", (req, res) => {
  uploadChamadoProfessor(req, res, (err) => {
    var error;
    if (req.user[0].eAdmin == 2) {
      var professor_matricula = req.user[0].matricula;
    } else {
      var professor_matricula = null;
    }

    if (typeof req.files[0] === "undefined") {
      req.files[0] = { filename: null };
      req.files[1] = { filename: null };
      req.files[2] = { filename: null };
    } else if (typeof req.files[1] === "undefined") {
      req.files[1] = { filename: null };
      req.files[2] = { filename: null };
    } else if (typeof req.files[2] === "undefined") {
      req.files[2] = { filename: null };
    }

    if (
      !req.body.titulo ||
      typeof req.body.titulo === undefined ||
      req.body.titulo === null
    ) {
      error = "Titulo invalido";
      res.render("professor/criar_chamado", { error });
    } else if (
      !req.body.assunto ||
      typeof req.body.assunto === undefined ||
      req.body.assunto === null
    ) {
      error = "Assunto invalido";
      res.render("professor/criar_chamado", { error });
    } else if (
      !req.body.nivel ||
      typeof req.body.nivel === undefined ||
      req.body.nivel === null ||
      req.body.nivel === "Selecione"
    ) {
      error = "Nível invalido";
      res.render("professor/criar_chamado", { error });
    } else if (
      !req.body.prioridade ||
      typeof req.body.prioridade === undefined ||
      req.body.prioridade === null ||
      req.body.prioridade === "Selecione"
    ) {
      error = "Prioridade invalida";
      res.render("professor/criar_chamado", { error });
    } else if (
      !req.body.descricao ||
      typeof req.body.descricao === undefined ||
      req.body.descricao === null
    ) {
      error = "Descrição invalida";
      res.render("professor/criar_chamado", { error });
    } else if (err instanceof multer.MulterError) {
      err = "Envio de arquivos invalida";
      res.setTimeout(480000);
      res.render("professor/criar_chamado", { error: err });
    } else if (err) {
      res.setTimeout(480000);
      res.render("professor/criar_chamado", { error: err });
    } else {
      bd1
        .insert_chamado({
          titulo: req.body.titulo,
          assunto: req.body.assunto,
          nome: req.body.nome,
          nivel: req.body.nivel,
          prioridade: req.body.prioridade,
          descricao: req.body.descricao,
          img1: req.files[0].filename,
          img2: req.files[1].filename,
          img3: req.files[2].filename,
          fk_professor: professor_matricula,
        })
        .then((msg) => {
          if (msg) {
            error = msg;
            res.render("/professor/criar_chamado", { error });
          } else {
            var sucesso = "Chamado cadastrado com sucesso";
            res.render("professor/criar_chamado", { sucesso });
          }
        });
    }
  });
});

router.get("/aluno", (req, res) => {
  bd.select_alunoAll().then((aluno) => {
    if (aluno === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("professor/alunos", { error_mensagem });
    } else if (aluno === "vazio") {
      var aviso_mensagem = "!!! Nenhum aluno cadastrado no sistema !!!";
      res.render("professor/alunos", { aviso_mensagem });
    } else {
      res.render("professor/alunos", { aluno });
    }
  });
});

router.get("/chamado", (req, res) => {
  bd1.select_chamadoProfessor(req.user).then((chamado_professor) => {
    if (chamado_professor === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("professor/chamado_professor", { error_mensagem });
    } else if (chamado_professor === "matricula") {
      res.render("professor/chamado_professor");
      error_mensagem = "Você não é professor, o que você tá fazendo aqui?";
      res.render("professor/chamado_professor", { error_mensagem });
    } else if (chamado_professor === "vazio") {
      var aviso_mensagem = "!!! Você não cadastrou nenhum chamado !!!";
      res.render("professor/chamado_professor", { aviso_mensagem });
    } else {
      res.render("professor/chamado_professor", { chamado_professor });
    }
  });
});

router.get("/atendimento", (req, res) => {
  res.render("professor/atendimento");
});

module.exports = router;
