const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const admin = require("./routes/admin");
const aluno = require("./routes/aluno");
const funcionario = require("./routes/funcionario");
const professor = require("./routes/professor");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const auth_admin = require("./config/auth_admin");
const auth_funcionario = require("./config/auth_funcionario");
const auth_professor = require("./config/auth_professor");
const auth_aluno = require("./config/auth_aluno");
const bd = require("./models/bd_aluno");
const bd1 = require("./models/bd_funcionario");
const bd2 = require("./models/bd_professor");
const port = 8008;

// config
//--sessão
app.use(
  session({
    secret: "sistemahelpdesk",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//--middleware
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.sucess_msg = req.flash("sucess_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});
//--Template Engine
app.engine(
  "handlebars",
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

//--body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

//Rotas
app.get("/", (req, res) => {
  res.render("login");
});

app.use("/admin", admin);
app.use("/aluno", aluno);
app.use("/professor", professor);
app.use("/funcionario", funcionario);

app.get("/esqueci-senha", (req, res) => {
  res.render("esqueceu_senha");
});

app.post("/esqueci-senha", (req, res) => {
  var dados = {
    matricula: req.body.matricula,
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
    res.render("esqueceu_senha", { error, dados });
  } else if (
    !req.body.senha ||
    typeof req.body.senha === undefined ||
    req.body.senha === null
  ) {
    error = "Senha invalida";
    res.render("esqueceu_senha", { error, dados });
  } else if (
    !req.body.senha2 ||
    typeof req.body.senha2 === undefined ||
    req.body.senha2 === null
  ) {
    error = "Repetição de senha invalida";
    res.render("esqueceu_senha", { error, dados });
  } else if (req.body.senha !== req.body.senha2) {
    error = "Senhas diferentes";
    res.render("esqueceu_senha", { error, dados });
  } else if (req.body.senha.length <= 7 || req.body.senha2.length <= 7) {
    error = "A senha deve ter mais do que 7 caracteres";
    res.render("esqueceu_senha", { error, dados });
  } else {
    bd.update_aluno_senha({
      senha: req.body.senha,
      matricula: req.body.matricula,
    }).then((error1) => {
      if (error1 === "error") {
        error = "Error no sistema tente novamente mais tarde";
        res.render("esqueceu_senha", { error, dados });
      } else if (error1 === "sucesso") {
        req.flash(
          "sucess_msg",
          "Alteração de senha do aluno feita com sucesso"
        );
        res.redirect("/");
      } else if (error1 === "falha") {
        bd1
          .update_funcionario_senha({
            senha: req.body.senha,
            matricula: req.body.matricula,
          })
          .then((error1) => {
            if (error1 === "error") {
              error = "Error no sistema tente novamente mais tarde";
              res.render("esqueceu_senha", { error, dados });
            } else if (error1 === "sucesso") {
              req.flash(
                "sucess_msg",
                "Alteração de senha do funcionário feita com sucesso"
              );
              res.redirect("/");
            } else if (error1 === "falha") {
              bd2
                .update_professor_senha({
                  senha: req.body.senha,
                  matricula: req.body.matricula,
                })
                .then((error1) => {
                  if (error1 === "error") {
                    error = "Error no sistema tente novamente mais tarde";
                    res.render("esqueceu_senha", { error, dados });
                  } else if (error1 === "sucesso") {
                    req.flash(
                      "sucess_msg",
                      "Alteração de senha do professor feita com sucesso"
                    );
                    res.redirect("/");
                  } else if (error1 === "falha") {
                    error = "Falha ao alterar a senha, verifique a matrícula";
                    res.render("esqueceu_senha", { error, dados });
                  }
                });
            }
          });
      }
    });
  }
});

app.post("/", (req, res, next) => {
  auth_admin
    .admin({ usuario: req.body.usuario, senha: req.body.senha })
    .then((admin) => {
      var [admin1] = admin;
      if (admin1.eAdmin == 1) {
        auth_admin.auth_admin1();
        passport.authenticate("local", {
          successRedirect: "/admin",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      } else {
        if (admin1.error == "error" || admin1.eAdmin != 1) {
          console.log("next");
          next();
        }
      }
    });
});
app.post("/", (req, res, next) => {
  auth_funcionario
    .funcionario({ usuario: req.body.usuario, senha: req.body.senha })
    .then((funcionario) => {
      var [funcionario1] = funcionario;
      if (funcionario1.eAdmin == 0) {
        auth_funcionario.auth_funcionario1();
        passport.authenticate("local", {
          successRedirect: "/funcionario",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      } else {
        if (funcionario1.error == "error") {
          console.log("next");
          next();
        }
      }
    });
});
app.post("/", (req, res, next) => {
  auth_professor
    .professor({ usuario: req.body.usuario, senha: req.body.senha })
    .then((professor) => {
      var [professor1] = professor;
      if (professor1.eAdmin == 2) {
        auth_professor.auth_professor1();
        passport.authenticate("local", {
          successRedirect: "/professor",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      } else {
        if (professor1.error == "error") {
          console.log("next");
          next();
        }
      }
    });
});
app.post("/", (req, res, next) => {
  auth_aluno
    .aluno({ usuario: req.body.usuario, senha: req.body.senha })
    .then((aluno) => {
      var [aluno1] = aluno;
      if (aluno1.eAdmin == 3 || aluno1.error == "error") {
        auth_aluno.auth_aluno1();
        passport.authenticate("local", {
          successRedirect: "/aluno",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      }
    });
});

// outros
app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
