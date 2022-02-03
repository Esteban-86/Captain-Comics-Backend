const cors = require('cors');
const express = require('express');

const app = express();

require('dotenv').config();

app.use(cors({
    origin: process.env.CLIENT_URL,
  }));

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });