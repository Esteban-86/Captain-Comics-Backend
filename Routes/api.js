const gamesRouter = require('./games');
const moviesRouter = require('./movies');
const adminsRouter = require('./admins');
const heroesRouter = require('./heroes');
const heroesGamesRouter = require('./heroes_games');
const heroesMoviesRouter = require('./heroes_movies');

const checkJwt = require('../middlewares/checkJwts');

const apiRouter = (app) => {
  app.use('/admins', adminsRouter);
  app.use('/games', gamesRouter);
  app.use('/movies', moviesRouter);
  app.use('/heroes', checkJwt, heroesRouter);
  app.use('/heroes_games', heroesGamesRouter);
  app.use('/heroes_movies', heroesMoviesRouter);
};

module.exports = apiRouter;