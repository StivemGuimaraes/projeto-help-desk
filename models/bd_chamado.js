const bd = require("../conexao");

const insert_chamado = async (chamado) => {
  try {
    const conn = await bd.con();
    const sql =
      "INSERT INTO chamado(titulo,assunto,nome_cliente,nivel,prioridade,descricao) VALUES (?,?,?,?,?,?)";
    const values = [
      chamado.titulo,
      chamado.assunto,
      chamado.nome,
      chamado.nivel,
      chamado.prioridade,
      chamado.descricao,
    ];
    await conn.query(sql, values);
    console.log("cadastramento do chamado realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};

const  select_chamado = async () => {
  try {
    const conn = await bd.con();
    const [select] = await conn.query("SELECT * FROM chamado;");
    console.log("seleção dos chamados realizado com sucesso");
    return select;
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
}
module.exports = { insert_chamado, select_chamado };
