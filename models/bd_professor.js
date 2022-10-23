const bd = require("../conexao");

const insert_professor = (professor) => {
  try {
    const conn = bd.con();
    const sql =
      "INSERT INTO professor(matricula,usuario,senha) VALUES (?,?,?);";
    const values = [professor.matricula, professor.usuario, professor.senha];
    conn.query(sql, values);
    console.log("cadastramento do professor realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

module.exports = { insert_professor };
