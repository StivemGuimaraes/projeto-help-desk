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

const select_funcionarioAll = async () => {
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

const select_funcionario = async (funcionario) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT matricula FROM funcionario WHERE matricula = ?";
    const value = [funcionario];
    const [matricula] = await conn.query(sql, value);
    if (matricula == "") {
      return false;
    } else {
      console.log(
        "selecionamento da matricula do funcionario realizado com sucesso"
      );
      return matricula;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
  }
};

const select_senha = async (funcionario) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT senha FROM funcionario WHERE senha = ?";
    const value = [funcionario];
    const [senha] = await conn.query(sql, value);
    if (senha == "") {
      return false;
    } else {
      console.log(
        "selecionamento da senha do funcionario realizado com sucesso"
      );
      return senha;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
  }
};

module.exports = {
  insert_funcionario,
  select_funcionarioAll,
  select_funcionario,
  select_senha,
};
