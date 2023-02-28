const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/db.config');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'OPTIONS');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);

  } else {
    app.listen(port);
    console.log(`DB Connected and server running on ${port}.`);

  }
});
  