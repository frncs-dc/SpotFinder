require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 3000;
  
// Connect to DB
connectDB();
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

app.use(express.static('public'));

// Templating Engine
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/routes/admin'));

app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`);
});

app.get('/park', (req, res) => {
  res.render('park');
});

app.get('/LogInPage', (req, res) => {
  res.render('Log In Page');
});

app.get('/Profile', (req, res) => {
  res.render('Profile');
});

app.get('/HostForm', (req, res) => {
  res.render('HostForm');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('', (req, res) => {
  res.render('index');
});

app.get('/Host-Posting/', (req, res) => {
  res.render('Host-Posting');
})