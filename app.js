const express = require('express');

const app = express();
require('dotenv').config();

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });