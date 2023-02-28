const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use(cors())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
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
    