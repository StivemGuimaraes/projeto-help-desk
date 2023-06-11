const con = () => {
  if (global.con && global.con.state !== "disconnected") return global.con;

  try {
    const mysql = require("mysql2/promise");
    const con = mysql.createPool({
      host: process.env.host | "localhost",
      user: process.env.user | "root",
      database: process.env.database | "academy_desk",
      password: process.env.password | "Mysqlstivem123",
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
