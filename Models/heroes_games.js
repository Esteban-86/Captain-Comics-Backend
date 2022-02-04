const connection = require('../connexion');

const TABLE = 'heroes_games';

const joinValue = ({ gameId, heroeId }) => connection.promise().query(`INSERT INTO ${TABLE} (game_id, heroe_id) VALUES (?, ?)`, [gameId, heroeId]);

const deleteOne = (id) => connection.promise().query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);

module.exports = {
  joinValue,
  deleteOne,
  heroesGamesTable: TABLE,
};