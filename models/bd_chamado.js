const bd = require("../conexao");

const insert_chamado = (chamado) => {
  try {
    const conn = bd.con();
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
    conn.query(sql, values);
    console.log("cadastramento do chamado realizado com sucesso");
  } catch (error) {
    console.log("deu erro, por alguma causa", error);
  }
};
module.exports = { insert_chamado };
