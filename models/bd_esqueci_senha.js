const bd = require("../conexao");

/*alteração de senha do aluno*/
const update_aluno_senha = async (aluno) => {
    try {
      const conn = await bd.con();
      const sql =
        "UPDATE aluno SET senha = ? WHERE matricula = ?;";
      const values = [
        aluno.senha,
        aluno.matricula,
      ];
      await conn.execute(sql, values);
      console.log("alteração do aluno feita com sucesso");
    } catch (error) {
      console.log("deu error por alguma causa", error);
      return "error";
    }
  };

  /*alteração de senha do professor*/
  const update_professor_senha = async (professor) => {
    try {
      const conn = await bd.con();
      const sql =
        "UPDATE professor SET senha = ? WHERE matricula = ?;";
      const values = [
        professor.senha,
        professor.matricula,
      ];
      await conn.execute(sql, values);
      console.log("alteração do professor feita com sucesso");
    } catch (error) {
      console.log("deu error por alguma causa", error);
      return "error";
    }
  };

  /*alteração de senha do funcionario*/
  const update_funcionario_senha = async (funcionario) => {
    try {
      const conn = await bd.con();
      const sql =
        "UPDATE funcionario SET senha = ? WHERE matricula = ?;";
      const values = [
        funcionario.senha,
        funcionario.matricula,
      ];
      await conn.execute(sql, values);
      console.log("alteração do funcionario feita com sucesso");
    } catch (error) {
      console.log("deu error por alguma causa", error);
      return "error";
    }
  };
  module.exports = {update_aluno_senha, update_funcionario_senha, update_professor_senha}
