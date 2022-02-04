const heroesMoviesRouter = require('express').Router();

const {
  joinValue,
  deleteOne,
} = require('../Models/heroes_movies');

heroesMoviessRouter.post('/', async (req, res) => {
  const [{ insertId: id }] = await joinValue(req.body);
  res.status(201).json({
    id,
    ...req.body,
  });
});

heroesMoviesRouter.delete('/:id', async (req, res) => {
  await deleteOne(req.params.id);
  res.status(204).json();
});

module.exports = heroesMoviesRouter;