const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "0.0.0.0",
      dialect: "mysql",
      port: process.env.PORT || 3000 || 3306 || 3001,
    }
  );
}

module.exports = sequelize;
