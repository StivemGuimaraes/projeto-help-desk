const bd = require("../conexao");

const insert_chamado = async (chamado) => {
  try {
    const conn = await bd.con();
    const sql =
      "INSERT INTO chamado(titulo,assunto,nivel,prioridade,descricao,img1,img2,img3,fk_aluno,fk_professor) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
      chamado.titulo,
      chamado.assunto,
      chamado.nivel,
      chamado.prioridade,
      chamado.descricao,
      chamado.img1,
      chamado.img2,
      chamado.img3,
      chamado.fk_aluno,
      chamado.fk_professor,
    ];
    await conn.execute(sql, values);
    console.log("cadastramento do chamado realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error no sistema tente novamente mais tarde";
  }
};

const select_chamadoAll = async () => {
  try {
    const conn = await bd.con();
    const [chamado] = await conn.execute(
      "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.img1, c.img2, c.img3, c.descricao, a.usuario AS nome_aluno, p.usuario AS nome_professor FROM ((chamado AS c LEFT JOIN professor AS p ON c.fk_professor = p.matricula) LEFT JOIN aluno AS a ON c.fk_aluno = a.matricula);"
    );
    if (chamado == "") {
      return "vazio";
    } else {
      console.log("seleção dos chamados realizado com sucesso");
      console.log(chamado);
      return chamado;
    }
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};

/*seleção de um chamado*/
const select_chamado1 = async (id) => {
  try {
    const conn = await bd.con();
    const sql =
      "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.img1, c.img2, c.img3, c.descricao, a.usuario AS nome_aluno, p.usuario AS nome_professor FROM ((chamado AS c LEFT JOIN professor AS p ON c.fk_professor = p.matricula) LEFT JOIN aluno AS a ON c.fk_aluno = a.matricula) where id = ?;";
    const value = [id];
    const [chamado] = await conn.execute(sql, value);
    if (chamado == "") {
      return "vazio";
    } else {
      console.log("selecionamento do chamado realizado com sucesso");
      return chamado;
    }
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

/*seleção de um usuario*/
const select_usuario_imagem = async (id) => {
  try {
    const conn = await bd.con();
    const sql =
      "SELECT c.img1, c.img2, c.img3, a.usuario AS nome_aluno, p.usuario AS nome_professor FROM ((chamado AS c LEFT JOIN professor AS p ON c.fk_professor = p.matricula) LEFT JOIN aluno AS a ON c.fk_aluno = a.matricula) where id = ?;";
    const value = [id];
    const [chamado] = await conn.execute(sql, value);
    console.log("selecionamento do chamado realizado com sucesso");
    return chamado;
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

const select_chamadoProfessor = async (professor) => {
  try {
    if (professor[0].eAdmin == 2) {
      console.log(professor[0].matricula);
      var professor_matricula = [professor[0].matricula];
      const conn = await bd.con();
      const sql =
        "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.img1, c.img2, c.img3, c.descricao, p.usuario AS nome_professor FROM chamado AS c JOIN professor AS p ON c.fk_professor = p.matricula WHERE p.matricula = ?;";
      const [chamado_professor] = await conn.execute(sql, professor_matricula);
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
      var aluno_matricula = [aluno[0].matricula];
      const conn = await bd.con();
      const sql =
        "SELECT c.id, c.titulo, c.assunto, c.statusd, c.nivel, c.prioridade, c.img1, c.img2, c.img3, c.descricao, a.usuario AS nome_aluno FROM chamado AS c JOIN aluno AS a ON c.fk_aluno = a.matricula WHERE a.matricula = ?;";
      const [chamado_aluno] = await conn.execute(sql, aluno_matricula);
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

const update_chamado = async (chamado) => {
  try {
    const conn = await bd.con();
    const sql =
      "UPDATE chamado SET titulo = ?, assunto = ?, statusd = ?, nivel = ?, prioridade = ?, img1 = ?, img2 = ?, img3 = ?, descricao = ? WHERE id = ?;";
    const values = [
      chamado.titulo,
      chamado.assunto,
      chamado.statusd,
      chamado.nivel,
      chamado.prioridade,
      chamado.img1,
      chamado.img2,
      chamado.img3,
      chamado.descricao,
      chamado.id,
    ];
    await conn.execute(sql, values);
    console.log("alteração do chamado realizado com sucesso");
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

const update_imagem = async (chamado) => {
  try {
    const conn = await bd.con();
    const sql = "UPDATE chamado SET img1 = ?, img2 = ?, img3 = ? WHERE id = ?;";
    const values = [chamado.img1, chamado.img2, chamado.img3, chamado.id];
    await conn.execute(sql, values);
    console.log("alteração das imagens realizado com sucesso");
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

const delete_chamado = async (id) => {
  try {
    const conn = await bd.con();
    const sql = "DELETE FROM chamado WHERE id = ?;";
    await conn.execute(sql, [id]);
    console.log("exclução do chamado feita com sucesso");
  } catch (error) {
    console.log("deu error por alguma causa", error);
    return "error";
  }
};

module.exports = {
  insert_chamado,
  select_chamadoAll,
  select_chamado1,
  select_usuario_imagem,
  select_chamadoProfessor,
  select_chamadoAluno,
  update_chamado,
  update_imagem,
  delete_chamado,
};
