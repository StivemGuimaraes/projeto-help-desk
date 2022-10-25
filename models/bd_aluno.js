const bd = require("../conexao");

const insert_aluno = (aluno) => {
  try {
    const conn = bd.con();
    const sql = "INSERT INTO aluno(matricula,usuario,senha) VALUES (?,?,?)";
    const values = [aluno.matricula, aluno.usuario, aluno.senha];
    conn.query(sql, values);
    console.log("cadastramento do aluno realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};
module.exports = { insert_aluno };
