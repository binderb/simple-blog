const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(express.json);
app.use(express.urlencoded({extended: true}));

async function init () {
  app.listen(PORT, () => console.log(`Listening on ${PORT}.`));
}

init();