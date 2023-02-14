const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors());

app.use(router);

const port = 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log('server running', port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
