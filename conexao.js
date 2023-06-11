const con = () => {
  try {
    const mysql = require("mysql2");
    const con = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0,
    });
    return con;
  } catch (error) {
    console.log("algo deu erro na conexão com banco de dados", error);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_DATABASE);
    console.log(process.env.DB_PASSWORD);
  }
};
module.exports = { con };
