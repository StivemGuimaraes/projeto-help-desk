const express = require("express");
const router = express.Router();
const bd = require("../models/bd_chamado");
const upload = require("../config/multer");
const multer = require("multer");
const uploadChamadoAluno = upload
  .upload_chamado_aluno()
  .array("imagem_chamado2", 3);
const uploadAluno = upload.upload_aluno();

router.get("/", (req, res) => {
  res.render("aluno/index");
});
router.get("/atendimento", (req, res) => {
  res.render("aluno/atendimento");
});

router.get("/criar-chamado", (req, res) => {
  res.render("aluno/criar_chamado");
});

router.post("/criar-chamado/nova", (req, res) => {
  uploadChamadoAluno(req, res, (err) => {
    var error;
    if (req.user[0].eAdmin == 3) {
      var aluno_matricula = req.user[0].matricula;
    } else {
      var aluno_matricula = null;
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
      res.render("aluno/criar_chamado", { error });
    } else if (
      !req.body.assunto ||
      typeof req.body.assunto === undefined ||
      req.body.assunto === null
    ) {
      error = "Assunto invalido";
      res.render("aluno/criar_chamado", { error });
    } else if (
      !req.body.nivel ||
      typeof req.body.nivel === undefined ||
      req.body.nivel === null ||
      req.body.nivel === "Selecione"
    ) {
      error = "Nível invalido";
      res.render("aluno/criar_chamado", { error });
    } else if (
      !req.body.prioridade ||
      typeof req.body.prioridade === undefined ||
      req.body.prioridade === null ||
      req.body.prioridade === "Selecione"
    ) {
      error = "Prioridade invalida";
      res.render("aluno/criar_chamado", { error });
    } else if (
      !req.body.descricao ||
      typeof req.body.descricao === undefined ||
      req.body.descricao === null
    ) {
      error = "Descrição invalida";
      res.render("aluno/criar_chamado", { error });
    } else if (err instanceof multer.MulterError) {
      err = "Envio de arquivos invalida";
      res.setTimeout(480000);
      res.render("aluno/criar_chamado", { error: err });
    } else if (err) {
      res.setTimeout(480000);
      res.render("aluno/criar_chamado", { error: err });
    } else {
      bd.insert_chamado({
        titulo: req.body.titulo,
        assunto: req.body.assunto,
        nome: req.body.nome,
        nivel: req.body.nivel,
        prioridade: req.body.prioridade,
        descricao: req.body.descricao,
        img1: req.files[0].filename,
        img2: req.files[1].filename,
        img3: req.files[2].filename,
        fk_aluno: aluno_matricula,
      }).then((msg) => {
        if (msg) {
          error = msg;
          res.render("aluno/criar_chamado", { error });
        } else {
          var sucesso = "Chamado cadastrado com sucesso";
          res.render("aluno/criar_chamado", { sucesso });
        }
      });
    }
  });
});

router.get("/chamado", (req, res) => {
  bd.select_chamadoAluno(req.user).then((chamado_aluno) => {
    if (chamado_aluno === "Error") {
      var error_mensagem = "Error no sistema tente novamente mais tarde";
      res.render("aluno/chamado_aluno", { error_mensagem });
    } else if (chamado_aluno === "matricula") {
      res.render("aluno/chamado_aluno");
      error_mensagem = "Você não é aluno, o que você tá fazendo aqui?";
      res.render("aluno/chamado_aluno", { error_mensagem });
    } else if (chamado_aluno === "vazio") {
      var aviso_mensagem = "!!! Você não cadastrou nenhum chamado !!!";
      res.render("aluno/chamado_aluno", { aviso_mensagem });
    } else {
      res.render("aluno/chamado_aluno", { chamado_aluno });
    }
  });
});

module.exports = router;
