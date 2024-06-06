const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','Deep@2212',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;