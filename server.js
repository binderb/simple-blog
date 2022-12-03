// Dependencies
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

// Define server and port
const app = express();
const PORT = process.env.PORT || 3001;

// Enable base middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Enable sessions
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 24 hours
    httpOnly: true,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}
app.use(session(sess));
// Enable modular routes
app.use(routes);
// Provide catch-all routes
app.get('*', (req,res) => {
  res.status(404).json({message:"Resource Not Found."});
});
app.post('*', (req,res) => {
  res.status(405).json({message:"Route not found, or HTTP method not allowed."});
});
app.put('*', (req,res) => {
  res.status(405).json({message:"Route not found, or HTTP method not allowed."});
});
app.delete('*', (req,res) => {
  res.status(405).json({message:"Route not found, or HTTP method not allowed."});
});

async function init () {
  await sequelize.sync({alter: true});
  app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
}

init();