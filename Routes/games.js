const gamesRouter = require('express').Router();
const Joi = require('joi');

const {
  findAll,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
} = require('../Models/games');

const checkJwt = require('../middlewares/checkJwts');

const gameSchema = (creation = false) => {
  const isRequired = creation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().presence(isRequired),
    description: Joi.string().presence(isRequired),
    releaseDate: Joi.string().presence(isRequired),
    picture: Joi.string().presence(isRequired),
  });
};

gamesRouter.get('/', async (req, res) => {
  const [games] = await findAll(req.query);
  res.json(games);
});

moviesRouter.get('/:id', async (req, res) => {
  const [[game]] = await findOneById(req.params.id);
  if (!game) res.status(404).json();
  res.json(game);
});

gamesRouter.post('/', checkJwt, async (req, res) => {
  const { value, error } = gameSchema(true).validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const [{ insertId: id }] = await createOne(req.body);
  return res.status(201).json({
    ...value,
    id,
  });
});

gamesRouter.put('/:id', checkJwt, async (req, res) => {
  const { error } = gameSchema().validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const [[existingGame]] = await findOneById(req.params.id);
  if (!existingGame) {
    return res.status(403).json({
      message: 'bad game use',
    });
  }
  await updateOne(req.body, req.params.id);
  return res.status(204).json();
});

moviesRouter.delete('/:id', checkJwt, async (req, res) => {
  await deleteOne(req.params.id);
  res.status(204).json();
});

module.exports = gamesRouter;