const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URI, { logging: false });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);

module.exports = db;
