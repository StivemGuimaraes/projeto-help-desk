const con = () => {
  if (global.con && global.con.state !== "disconnected") return global.con;

  try {
    const mysql = require("mysql2/promise");
    const con = mysql.createPool({
      host: process.env.host,
      user: process.env.user,
      port: process.env.port,
      database: process.env.database,
      password: process.env.password,
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
