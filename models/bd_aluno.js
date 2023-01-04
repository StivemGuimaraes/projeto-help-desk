const bd = require("../conexao");

const insert_aluno = async (aluno) => {
  try {
    const conn = await bd.con();
    const sql = "INSERT INTO aluno(matricula,usuario,senha) VALUES (?,?,?);";
    const values = [aluno.matricula, aluno.usuario, aluno.senha];
    await conn.query(sql, values);
    console.log("cadastramento do aluno realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Erro no sistema tente novamente mais tarde";
  }
};

const select_alunoAll = async () => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM aluno;";
    const [aluno] = await conn.query(sql);
    if (aluno == "") {
      return "vazio";
    } else {
      console.log("selecionamento dos alunos realizado com sucesso");
      return aluno;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error";
  }
};

const select_aluno = async (aluno) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT matricula FROM aluno WHERE matricula = ?;";
    const value = [aluno];
    const [matricula] = await conn.query(sql, value);
    if (matricula == "") {
      return false;
    } else {
      console.log("selecionamento da matricula do aluno realizado com sucesso");
      return "Aluno já cadastrado no sistema";
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_senha = async (aluno) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT senha FROM aluno WHERE senha = ?;";
    const value = [aluno];
    const [senha] = await conn.query(sql, value);
    if (senha == "") {
      return false;
    } else {
      console.log("selecionamento da senha do aluno realizado com sucesso");
      return "Senha já cadastrada no sistema";
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_aluno1 = async (matricula) => {
  try {
    const conn = await bd.con();
    const sql = "SELECT * FROM aluno WHERE matricula = ?;";
    const value = matricula;
    const [aluno] = await conn.query(sql, value);
    if (aluno == "") {
      return "vazio";
    } else {
      console.log("selecionamento do aluno realizado com sucesso");
      return aluno;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

const delete_update_aluno = async (aluno) => {
  console.log(aluno);
  try {
    const conn = await bd.con();
    const sql =
      "DELETE FROM chamado WHERE fk_aluno = ?; UPDATE aluno SET matricula = ?, usuario = ?, senha = ? WHERE matricula = ?;";
    const values = [
      aluno.matricula1,
      aluno.matricula,
      aluno.usuario,
      aluno.senha,
      aluno.matricula1,
    ];
    await conn.query(sql, values);
    console.log("alteração do aluno feita com sucesso");
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

module.exports = {
  insert_aluno,
  select_alunoAll,
  select_aluno,
  select_senha,
  select_aluno1,
  delete_update_aluno,
};
