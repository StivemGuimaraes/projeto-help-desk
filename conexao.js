const con = () => {
  if (global.con && global.con.state !== "disconnected") return global.con;

  try {
    const mysql = require("mysql2/promise");
    const con = mysql.createPool({
      host: process.env.DB_HOST | "localhost",
      user: process.env.DB_USER | "root",
      database: process.env.DB_DATABASE | "academy_desk",
      password: process.env.DB_PASSWORD | "Mysqlstivem123",
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0,
    });
    global.con = con;
    return con;
  } catch (error) {
    console.log("algo deu erro na conexão com banco de dados");
  }
};
module.exports = { con };
