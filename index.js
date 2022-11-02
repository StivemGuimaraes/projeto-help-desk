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
app.use(flash());
//--middleware
app.use((req, res, next) => {
  res.locals.matricula = req.flash("matricula");
  res.locals.usuario = req.flash("usuario");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.sucess_msg = req.flash("sucess_msg");
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
app.post("/", (req, res) => {});
app.use("/admin", admin);
app.use("/aluno", aluno);
app.use("/professor", professor);
app.use("/funcionario", funcionario);

// outros
app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
