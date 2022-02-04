const connection = require('../connexion');

const TABLE = 'heroes_movies';

const joinValue = ({ movieId, heroeId }) => connection.promise().query(`INSERT INTO ${TABLE} (movie_id, heroe_id) VALUES (?, ?)`, [movieId, heroeId]);

const deleteOne = (id) => connection.promise().query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);

module.exports = {
  joinValue,
  deleteOne,
  heroesMoviesTable: TABLE,
};