const bd = require("../conexao");

const insert_chamado = async (chamado) => {
  try {
    const conn = await bd.con();
    const sql =
      "INSERT INTO chamado(titulo,assunto,nivel,prioridade,descricao,fk_aluno,fk_professor) VALUES (?,?,?,?,?,?,?)";
    const values = [
      chamado.titulo,
      chamado.assunto,
      chamado.nivel,
      chamado.prioridade,
      chamado.descricao,
      chamado.fk_aluno,
      chamado.fk_professor,
    ];
    await conn.query(sql, values);
    console.log("cadastramento do chamado realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_chamadoAll = async () => {
  try {
    const conn = await bd.con();
    const [chamado] = await conn.query(
      "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.descricao, a.usuario AS nome_aluno, p.usuario AS nome_professor FROM ((chamado AS c LEFT JOIN professor AS p ON c.fk_professor = p.matricula) LEFT JOIN aluno AS a ON c.fk_aluno = a.matricula);"
    );
    if (chamado == "") {
      return "vazio";
    } else {
      console.log("seleção dos chamados realizado com sucesso");
      return chamado;
    }
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};

const select_chamadoProfessor = async (professor) => {
  try {
    if (professor[0].eAdmin == 2) {
      var professor_matricula = professor[0].matricula;
      const conn = await bd.con();
      const sql =
        "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.descricao, p.usuario AS nome_professor FROM chamado AS c JOIN professor AS p ON c.fk_professor = p.matricula WHERE p.matricula = ?;";
      const [chamado_professor] = await conn.query(sql, professor_matricula);
      if (chamado_professor == "") {
        return "vazio";
      } else {
        console.log("seleção dos chamados do professor realizado com sucesso");
        return chamado_professor;
      }
    } else {
      return "matricula";
    }
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};

const select_chamadoAluno = async (aluno) => {
  try {
    if (aluno[0].eAdmin == 3) {
      var aluno_matricula = aluno[0].matricula;
      const conn = await bd.con();
      const sql =
        "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.descricao, a.usuario AS nome_aluno FROM chamado AS c JOIN aluno AS a ON c.fk_aluno = a.matricula WHERE a.matricula = ?;";
      const [chamado_aluno] = await conn.query(sql, aluno_matricula);
      if (chamado_aluno == "") {
        return "vazio";
      } else {
        console.log("seleção dos chamados do aluno realizado com sucesso");
        return chamado_aluno;
      }
    } else {
      return "matricula";
    }
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};

module.exports = {
  insert_chamado,
  select_chamadoAll,
  select_chamadoProfessor,
  select_chamadoAluno,
};
