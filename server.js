const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(express.json);
app.use(express.urlencoded({extended: true}));

async function init () {
  await sequelize.sync({alter: true});
  app.listen(PORT, () => console.log(`Listening on ${PORT}.`));
}

init();