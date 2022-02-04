const heroesGamesRouter = require('express').Router();

const {
  joinValue,
  deleteOne,
} = require('../Models/heroes_games');

heroesGamesRouter.post('/', async (req, res) => {
  const [{ insertId: id }] = await joinValue(req.body);
  res.status(201).json({
    id,
    ...req.body,
  });
});

heroesGamesRouter.delete('/:id', async (req, res) => {
  await deleteOne(req.params.id);
  res.status(204).json();
});

module.exports = heroesGamesRouter;
