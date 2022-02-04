const connection = require('../connexion');

const TABLE = 'admins';

const findOneByEmail = (email) => connection.promise().query(`SELECT * FROM ${TABLE} WHERE email = ?`, [email]);

const createOne = (firstname, lastname, email, password) => connection.promise().query(`INSERT INTO ${TABLE} (firstname, lastname, email, password) VALUES (?,?,?,?)`, [firstname, lastname, email, password]);

const deleteOne = (email) => connection.promise().query(`DELETE FROM ${TABLE} WHERE email = ?`, [email]);

module.exports = {
  findOneByEmail,
  createOne,
  deleteOne,
};
