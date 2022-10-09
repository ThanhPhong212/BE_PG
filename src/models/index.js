const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URI, {
  logging: false,
  timezone: "+07:00",
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.data = require("./data")(sequelize, Sequelize);
module.exports = db;
