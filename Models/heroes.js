const connection = require('../connexion');

const TABLE = 'heroes';

const findAll = () => connection.promise().query(`SELECT * FROM ${TABLE}`);

const findOneById = (id) => connection.promise().query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);

const findOneByName = (name) => connection.promise().query(`SELECT * FROM ${TABLE} WHERE name = ?`, [name]);

const createOne = (name) => connection.promise().query(`INSERT INTO ${TABLE} (name) VALUES (?)`, [name]);

const updateOne = (object, id) => connection.promise().query(`UPDATE ${TABLE} SET ? WHERE id = ?`, [object, id]);

const deleteOne = (id) => connection.promise().query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);

module.exports = {
  findAll,
  findOneById,
  findOneByName,
  createOne,
  updateOne,
  deleteOne,
  heroesTable: TABLE,
};