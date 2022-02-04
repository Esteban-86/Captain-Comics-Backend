const connection = require('../connexion');
const { heroesMoviesTable } = require('./heroes_movies');

const TABLE = 'movies';

const findAll = ({ heroe }) => {
  let query = `SELECT m.id, m.name, m.description, m.releaseDate, m.picture FROM ${TABLE} m`;
  const params = [];
  if (heroe) {
    query += ` JOIN ${heroesMoviesTable} hm ON m.id = hm.movie_id WHERE hm.heroe_id = ?`;
    params.push(heroe);
  }
  return connection.promise().query(query, params);
};

const findOneById = (id) => connection.promise().query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);

const createOne = ({ name, description, releaseDate, picture }) => connection.promise().query(`INSERT INTO ${TABLE} (name, description, releaseDate, picture) VALUES (?, ?, ?, ?)`, [name, description, releaseDate, picture]);

const updateOne = (object, id) => connection.promise().query(`UPDATE ${TABLE} SET ? WHERE id = ?`, [object, id]);

const deleteOne = (id) => connection.promise().query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);

module.exports = {
  findAll,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  moviesTable: TABLE,
};