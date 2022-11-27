const con = () => {
  if (global.con && global.con.state !== "disconnected") return global.con;

  try {
    const mysql = require("mysql2/promise");
    const con = mysql.createPool({
      host: "localhost",
      user: "root",
      database: "academy_desk",
      password: "Mysqlstivem123",
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
    });
    global.con = con;
    return con;
  } catch (error) {
    console.log("algo deu erro na conexão com banco de dados");
  }
};
module.exports = { con };
