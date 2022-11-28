const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const admin = require("./routes/admin");
const aluno = require("./routes/aluno");
const funcionario = require("./routes/funcionario");
const professor = require("./routes/professor");
const bd = require("./conexao");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const auth1 = require("./config/auth_admin");
const auth2 = require("./config/auth_funcionario");
const port = 8008;

// config
//--sessão
app.use(
  session({
    key: "cookie_name",
    secret: "sistemahelpdesk",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
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
app.post("/", (req, res, next) => {
  auth1
    .admin({ usuario: req.body.usuario, senha: req.body.senha })
    .then((admin) => {
      var [admin1] = admin;
      if (admin1.eAdmin == 1 || admin1.error == "error") {
        passport.authenticate("local", {
          successRedirect: "/admin",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      } else {
        console.log("next");
        next();
      }
    });
});
app.post("/", (req, res, next) => {
  auth2
    .funcionario({ usuario: req.body.usuario, senha: req.body.senha })
    .then((funcionario) => {
      var [funcionario1] = funcionario;
      if (funcionario1.eAdmin == 0 || funcionario1.error == "error") {
        passport.authenticate("local", {
          successRedirect: "/funcionario",
          failureRedirect: "/",
          failureFlash: true,
        })(req, res, next);
      } else {
        next();
      }
    });
});
app.use("/admin", admin);
app.use("/aluno", aluno);
app.use("/professor", professor);
app.use("/funcionario", funcionario);

// outros
app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
