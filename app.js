const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const print = require('./utils/utilFuncs');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config()

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.dbURI)
  .then(() => {
    print("connected to DB")
    app.listen(3000)
  })
  .catch((err) => print(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)

// cookies
// app.get('/set-cookies', (req, res) => {
//   //res.setHeader('Set-Cookie', 'newUser=true')
//   res.cookie('newUser', false)

//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true}) // secure: true - secure means when website is secured "https"  
//   res.send('you got the cookies!')
// })

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies
//   print(cookies)
//   res.json(cookies)
// })

// write to the terminal: npm run server