// require('dotenv').config();
// const { Sequelize, Model, DataTypes, NOW } = require('sequelize');
// const { now } = require('sequelize/lib/utils');
// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

//     async function testConnection() {
//         try {
//             await sequelize.authenticate();
//             console.log('Connection has been established successfully.');
//         } catch (error) {
//             console.error('Unable to connect to the database:', error);
//         }
//     }
//     testConnection();


// const { Sequelize } = require('sequelize');
// module.exports = sequelize;

require('dotenv').config();
const Sequelize = require('sequelize');
 
const sequelize = new Sequelize(
process.env.DB_DATABASE,
process.env.DB_USER,
process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
 
const auth = sequelize.authenticate()
  .then(() => console.log('Connection to MySQL has been established.'))
  .catch(err => console.error('Unable to connect to MySQL:', err));
 
module.exports = { sequelize, Sequelize, auth };