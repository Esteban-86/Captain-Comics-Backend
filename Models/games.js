const connection = require('../connexion');
const { heroesGamesTable } = require('./heroes_games');

const TABLE = 'games';

const findAll = ({ heroe }) => {
  let query = `SELECT g.id, g.name, g.description, g.releaseDate, g.picture FROM ${TABLE} g`;
  const params = [];
  if (heroe) {
    query += ` JOIN ${heroesGamesTable} hg ON g.id = hg.game_id WHERE hg.heroe_id = ?`;
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
  gamesTable: TABLE,
};