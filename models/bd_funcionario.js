const bd = require("../conexao");

const insert_funcionario = async (funcionario) => {
  try {
    const conn = await bd.con();
    const sql =
      "INSERT INTO funcionario(matricula,usuario,senha) VALUES (?,?,?)";
    const values = [
      funcionario.matricula,
      funcionario.usuario,
      funcionario.senha,
    ];
    await conn.query(sql, values);
    console.log("cadastramento do funcionario realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

const select_funcionario = async () => {
  try {
    const conn = bd.con();
    const sql = "SELECT * FROM funcionario;";
    const [funcionario] = await conn.query(sql);
    console.log("selcionamento do funcionario");
    return funcionario;
  } catch (error) {
    console.log("deu error, por alguma causa", error);
  }
};
module.exports = { insert_funcionario, select_funcionario };
