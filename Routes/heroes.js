const heroesRouter = require('express').Router();
const Joi = require('joi');

const checkJwt = require('../middlewares/checkJwt');

const {
  findAll,
  findOneByName,
  insertHeroe,
  deleteOneById,
  findOneById,
} = require('../Models/heroes');

const heroeSchema = Joi.object({
  name: Joi.string().required(),
});

heroesRouter.get('/', async (req, res) => {
  const [heroes] = await findAll();
  res.json(heroes);
});

heroesRouter.get('/:id', async (req, res) => {
  const [[heroe]] = await findOneById(req.params.id);
  res.json(heroe);
});

heroesRouter.post('/', checkJwt, async (req, res) => {
  const { value, error } = heroeSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[heroe]] = await findOneByName(value.name);

  if (heroe) {
    return res.status(403).json({
      message: 'heroe already exists',
    });
  }

  const [{ insertId }] = await createOne(value.name);

  return res.status(201).json({
    id: insertId,
    ...value,
  });
});

heroesRouter.put('/:id', async (req, res) => {
    const { value, error } = heroeSchema().validate({ id: req.params.id, name: req.body.name });
    if (error) {
      return res.status(400).json(error);
    }
    const [[existingHeroe]] = await findOneById(value.id);
    if (!existingHeroe) {
      return res.status(403).json({
        message: 'bad heroe use',
      });
    }
    await updateOne(req.body, req.params.id);
    return res.status(204).json();
  });

heroesRouter.delete('/:id', checkJwt, async (req, res) => {
  const [{ affectedRows }] = await deleteOneById(req.params.id);
  if (affectedRows) {
    res.status(202);
  } else {
    res.status(204);
  }
  return res.json();
});

module.exports = heroesRouter;