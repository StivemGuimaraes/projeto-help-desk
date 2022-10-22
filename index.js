const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const admin = require("./routes/admin");
const aluno = require("./routes/aluno");
const funcionario = require("./routes/funcionario");
const professor = require("./routes/professor");
const port = 8008;

// config
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

// Static Files
app.use(express.static(path.join(__dirname, "public")));

//mysql
/*(async () => {
  const bd = require("./conexao");
  await bd.teste({ matricula: "14785", usuario: "stivem", senha: "stivem123" });
})();*/

//Rotas
app.get("/", (req, res) => {
  res.render("login");
});
app.use("/admin", admin);
app.use("/aluno", aluno);
app.use("/professor", professor);
app.use("/funcionario", funcionario);

// outros
app.listen(port, () => {
  console.log("servidor nodemon funcionando finalmente");
});
