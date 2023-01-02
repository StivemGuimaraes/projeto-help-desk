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
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_professorAll = async () => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM professor;";
    const [professor] = await conn.query(sql);
    if (professor == "") {
      return "vazio";
    } else {
      console.log("selecionamento do professor realizado com sucesso");
      return professor;
    }
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};

const select_professor = async (professor) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT matricula FROM professor WHERE matricula = ?";
    const value = [professor];
    const [matricula] = await conn.query(sql, value);
    if (matricula == "") {
      return false;
    } else {
      console.log(
        "selecionamento da matricula do professor realizado com sucesso"
      );
      return "Professor já cadastrado no sistema";
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_senha = async (professor) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT senha FROM professor WHERE senha = ?";
    const value = [professor];
    const [senha] = await conn.query(sql, value);
    if (senha == "") {
      return false;
    } else {
      console.log("selecionamento da senha do professor realizado com sucesso");
      return "Senha já cadastrada no sistema";
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

module.exports = {
  insert_professor,
  select_professorAll,
  select_professor,
  select_senha,
};
