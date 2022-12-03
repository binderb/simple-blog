const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// Define server and port
const app = express();
const PORT = process.env.PORT || 3001;

// Enable base middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Enable routes
app.use(routes);
// Catch-all route
app.get('*', (req,res) => {
  res.status(404).json({message:"Route Not Found!"});
});

async function init () {
  await sequelize.sync({alter: true});
  app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
}

init();