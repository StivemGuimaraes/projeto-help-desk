async function con() {
  if (global.con && global.con.state !== "disconnected") return global.con;

  try {
    const mysql = require("mysql2/promise");
    const con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "academy_desk",
      password: "Mysqlstivem123",
    });
    console.log("Conectou no mysql");
    global.con = con;
    return con;
  } catch (error) {
    console.log("algo deu erro na conexão com banco de dados");
  }
}
async function teste(professor) {
  try {
    const conn = await con();
    const sql =
      "INSERT INTO professor(matricula,usuario,senha) VALUES (?,?,?);";
    const values = [professor.matricula, professor.usuario, professor.senha];
    await conn.query(sql, values);
    console.log("insert funcionou");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { teste };
