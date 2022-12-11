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
      chamado.fk_professor
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
    const [chamado] = await conn.query("SELECT * FROM chamado;");
    console.log("seleção dos chamados realizado com sucesso");
    return chamado;
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
    return "Error";
  }
};
module.exports = { insert_chamado, select_chamadoAll };
