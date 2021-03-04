const Sequelize = require('sequelize');
const config = require('config');

const dbconfig = config.get('database')

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
  dialect: dbconfig.dialect,
  storage: dbconfig.storage,
  logging: dbconfig.logging,
});

module.exports = sequelize;
