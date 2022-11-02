const bd = require("../conexao");

const insert_aluno = async (aluno) => {
  try {
    const conn = await bd.con();
    const sql = "INSERT INTO aluno(matricula,usuario,senha) VALUES (?,?,?)";
    const values = [aluno.matricula, aluno.usuario, aluno.senha];
    await conn.query(sql, values);
    console.log("cadastramento do aluno realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

const select_aluno = async () => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM aluno;";
    const [aluno] = await conn.query(sql);
    console.log("selecionamento do aluno realizado aluno");
    return aluno;
  } catch (error) {
    console.log("deu error por alguma causa", error);
  }
};
module.exports = { insert_aluno, select_aluno };
