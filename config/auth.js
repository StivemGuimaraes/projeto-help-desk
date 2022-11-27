const localStrategy = require("passport-local").Strategy;
const bd = require("../conexao");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "usuario", passwordField: "senha" },
      async (usuario, senha, done) => {
        try {
          const conn = await bd.con();
          const sql = "SELECT * FROM funcionario WHERE usuario = ?;";
          const [funcionario] = await conn.query(sql, usuario);
          /*console.log("selcionamento do funcionario", funcionario);*/
          if (funcionario == "") {
            return done(null, false, {
              message: "Usuário ou Senha incorretos",
            });
          } else {
            const sql = "SELECT * FROM funcionario WHERE senha = ?;";
            const [funcionario] = await conn.query(sql, senha);
            /* console.log("selcionamento do funcionario", funcionario);*/
            if (funcionario == "") {
              return done(null, false, {
                message: "Usuário ou Senha incorretos",
              });
            } else {
              /*console.log(funcionario);*/
              return done(null, funcionario);
            }
          }
        } catch (error) {
          console.log("deu error", error);
        }
      }
    )
  );
  passport.serializeUser((usuario, done) => {
    done(null, usuario);
  });

  passport.deserializeUser((usuario, done) => {
    done(null, usuario);
  });
};
