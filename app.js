const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(process.env.dbURI)
  .then(() => {
    console.log("connected to DB")
    app.listen(3000)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// write to the terminal: npm run server