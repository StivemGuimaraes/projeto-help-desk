const bd = require("../conexao");

const insert_professor = async (professor) => {
  try {
    const conn = await bd.con();
    const sql =
      "INSERT INTO professor(matricula,usuario,senha) VALUES (?,?,?);";
    const values = [professor.matricula, professor.usuario, professor.senha];
    await conn.query(sql, values);
    console.log("cadastramento do professor realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

const select_professor = async () => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM professor;";
    const [professor] = await conn.query(sql);
    console.log("pegando dados do professor realizado com sucesso");
    return professor;
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

module.exports = { insert_professor, select_professor };
