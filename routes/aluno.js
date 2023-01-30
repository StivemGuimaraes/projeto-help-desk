const express = require("express");
const router = express.Router();
const bd = require("../models/bd_chamado");
const upload = require("../config/multer");
const multer = require("multer");
const fs = require("fs");
const uploadChamadoAluno = upload
  .upload_chamado_aluno()
  .array("imagem_chamado2", 3);
const alteracaoAlunoImagem = upload
  .alteracao_aluno_imagem()
  .array("imagem_alteracao_chamado", 3);
const uploadAluno = upload.upload_aluno();
var chamado1;

router.get("/", (req, res) => {
  res.render("aluno/index");
});
router.get("/atendimento", (req, res) => {
  res.render("aluno/atendimento");
});

/*inclusão de dados do chamado do aluno*/
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

/*seleção do chamado do aluno*/
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
    } else if (chamado_aluno[0].statusd == "Aberto") {
      chamado_aluno[0].i1 = "algo";
      res.render("aluno/chamado_aluno", { chamado_aluno });
    } else if (chamado_aluno[0].statusd == "Andamento") {
      chamado_aluno[0].i2 = "algo";
      res.render("aluno/chamado_aluno", { chamado_aluno });
    } else if (chamado_aluno[0].statusd == "Fechado") {
      chamado_aluno[0].i3 = "algo";
      res.render("aluno/chamado_aluno", { chamado_aluno });
    }
  });
});

/*alteracao do chamado*/
router.get("/chamado/alteracao/:id", (req, res) => {
  bd.select_chamado1(req.params.id).then((chamado) => {
    if (chamado === "vazio") {
      req.flash("error_msg", "Chamado não encontrado");
      res.redirect("/aluno/chamado");
    } else if (chamado === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/aluno/chamado");
    } else {
      chamado = chamado[0];
      chamado1 = chamado;
      console.log(chamado1);
      res.render("aluno/edicao_chamado", { chamado });
    }
  });
});

router.post("/chamado/alteracao", (req, res) => {
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
      } else if (
        typeof req.files[2] !== "undefined" &&
        chamado1.img3 !== null
      ) {
        fs.unlink("./public/upload/chamado_aluno/" + chamado1.img1, (err) => {
          if (err) {
            console.log("olá", err);
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
        res.render("aluno/edicao_chamado", { error: err });
      } else if (err) {
        res.setTimeout(480000);
        res.render("aluno/edicao_chamado", { error: err });
      } else {
        bd.update_chamado({
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
        }).then((error) => {
          if (error === "error") {
            req.flash(
              "error_msg",
              "Error no sistema tente novamente mais tarde"
            );
            res.redirect("/aluno/chamado");
          } else {
            req.flash("sucess_msg", "Alteração do chamado feita com sucesso");
            res.redirect("/aluno/chamado");
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
      bd.update_imagem({
        img1: null,
        img2: null,
        img3: null,
        id: chamado1.id,
      }).then((error) => {
        if (error === "error") {
          req.flash("error_msg", "Error no sistema tente novamente mais tarde");
          res.redirect("/aluno/chamado");
        } else {
          req.flash("sucess_msg", "Exclusão das imagens feita com sucesso");
          res.redirect("/aluno/chamado/alteracao/" + chamado1.id);
        }
      });
    }
  });
});

/*exclusão do chamado*/
router.get("/chamado/exclusao/:id", (req, res) => {
  bd.select_usuario_imagem(req.params.id).then((usuario) => {
    if (usuario === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/aluno/chamado");
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
  bd.delete_chamado(req.params.id).then((error) => {
    if (error === "error") {
      req.flash("error_msg", "Error no sistema tente novamente mais tarde");
      res.redirect("/aluno/chamado");
    } else if (chamado1.img1 != null) {
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
    res.redirect("/aluno/chamado");
  });
});

module.exports = router;
