const adminsRouter = require('express').Router();
const Joi = require('joi');
const argon2 = require('argon2');
const { generateJwt } = require('../utils/auth');

const checkJwt = require('../middlewares/checkJwts');

require('dotenv').config();

const { findOneByEmail, createOne, deleteOne } = require('../Models/admins');

const adminSchema = (login = false) => {
  const isRequired = login ? 'forbidden' : 'required';
  return Joi.object({
    firstname: Joi.string().presence(isRequired),
    lastname: Joi.string().presence(isRequired),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
};

adminsRouter.post('/', checkJwt, async (req, res) => {
  const { value, error } = adminSchema().validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[existingAdmin]] = await findOneByEmail(value.email);

  if (existingAdmin) {
    return res.status(409).json({
      message: 'email already exists',
    });
  }

  const hashedPassword = await argon2.hash(value.password);

  await createOne(value.firstname, value.lastname, value.email, hashedPassword);

  const jwtKey = generateJwt(value.email, value.firstname, value.lastname);

  return res.json({
    credential: jwtKey,
  });
});

adminsRouter.post('/login', async (req, res) => {
  const { value, error } = adminSchema(true).validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }
  const [[existingAdmin]] = await findOneByEmail(value.email);

  if (!existingAdmin) {
    return res.status(403).json({
      message: 'bad email or password',
    });
  }
  const verified = await argon2.verify(existingAdmin.password, value.password);

  if (!verified) {
    return res.status(403).json({
      message: 'bad email or password',
    });
  }
  const jwtKey = generateJwt(value.email);

  return res.json({
    credential: jwtKey,
  });
});

adminsRouter.delete('/:id', checkJwt, async (req, res) => {
  await deleteOne(req.params.id);
  return res.json.status(204);
});

module.exports = adminsRouter;