const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/db.config.js');
const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
    next();
  })
  .use('/', require('./routes'));
  
//const db = require('./models');
//db.mongodb
//  .connect(db.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
mongodb.initDb((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port);
    console.log(`DB Connected and server running on ${port} `);
    }
    });
  
  
    