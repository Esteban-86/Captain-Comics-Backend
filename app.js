const cors = require('cors');
const express = require('express');
const apiRouter = require('./Routes/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

apiRouter(app);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});

module.exports = app;