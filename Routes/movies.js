const moviesRouter = require('express').Router();
const Joi = require('joi');

const {
  findAll,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
} = require('../Models/movies');

const checkJwt = require('../middlewares/checkJwts');

const movieSchema = (creation = false) => {
  const isRequired = creation ? 'required' : 'optional';
  return Joi.object({
    name: Joi.string().presence(isRequired),
    description: Joi.string().presence(isRequired),
    releaseDate: Joi.string().presence(isRequired),
    picture: Joi.string().presence(isRequired),
  });
};

moviesRouter.get('/', async (req, res) => {
  const [movies] = await findAll(req.query);
  res.json(movies);
});

moviesRouter.get('/:id', async (req, res) => {
  const [[movie]] = await findOneById(req.params.id);
  if (!movie) res.status(404).json();
  res.json(movie);
});

moviesRouter.post('/', checkJwt, async (req, res) => {
  const { value, error } = movieSchema(true).validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const [{ insertId: id }] = await createOne(req.body);
  return res.status(201).json({
    ...value,
    id,
  });
});

moviesRouter.put('/:id', checkJwt, async (req, res) => {
  const { error } = movieSchema().validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  const [[existingMovie]] = await findOneById(req.params.id);
  if (!existingMovie) {
    return res.status(403).json({
      message: 'bad movie use',
    });
  }
  await updateOne(req.body, req.params.id);
  return res.status(204).json();
});

moviesRouter.delete('/:id', checkJwt, async (req, res) => {
  await deleteOne(req.params.id);
  res.status(204).json();
});

module.exports = moviesRouter;