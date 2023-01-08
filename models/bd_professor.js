const bd = require("../conexao");

/*inclusão do professor*/
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

/*seleção de todos os professores*/
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

/*seleção da matricula do professor*/
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
      return "Matrícula do professor já cadastrada no sistema";
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

/*seleção de senha do professor*/
const select_senha = async (professor) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT senha FROM professor WHERE matricula = ?";
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

/*seleção de um professor*/
const select_professor1 = async (matricula) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM professor WHERE matricula = ?;";
    const value = matricula;
    const [professor] = await conn.query(sql, value);
    if (professor == "") {
      return "vazio";
    } else {
      console.log("selecionamento do professor realizado com sucesso");
      return professor;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

/*exclusão do chamado e alteração do professor*/
const delete_update_professor = async (professor) => {
  try {
    const conn = await bd.con();
    const sql = "DELETE FROM chamado WHERE fk_professor = ?;";
    const values = [professor.matricula1];
    await conn.query(sql, values);
    console.log("deletação do chamado do professor feita com sucesso");
    const sql1 =
      "UPDATE professor SET matricula = ?, usuario = ?, senha = ? WHERE matricula = ?;";
    const values1 = [
      professor.matricula,
      professor.usuario,
      professor.senha,
      professor.matricula1,
    ];
    await conn.query(sql1, values1);
    console.log("alteração do professor feita com sucesso");
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};
module.exports = {
  insert_professor,
  select_professorAll,
  select_professor,
  select_senha,
  select_professor1,
  delete_update_professor,
};
