const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateJwt = (email, firstname, lastname) => jwt.sign({
  email,
  firstname,
  lastname,
}, process.env.JWT_SECRET);

module.exports = {
  generateJwt,
};