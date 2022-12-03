const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// Define server and port
const app = express();
const PORT = process.env.PORT || 3001;

// Enable base middleware
app.use(express.json);
app.use(express.urlencoded({extended: true}));
// Enable routes
app.use(routes);

async function init () {
  await sequelize.sync({force: true});
  app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
}

init();