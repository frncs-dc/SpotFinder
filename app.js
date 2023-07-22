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

app.use('/', require('./server/routes/main'));
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

// app.post("/HostForm", (req, res) => {
//   let newPost = new Post({
//     address__region: req.body.address__region,
//     address__city: req.body.address__city,
//     address: req.body.address,
//     isAssignedParking: req.body.isAssignedParking,
//     total_capacity: req.body.total_capacity,
//     floors: req.body.floors,
//     isCarSupported: req.body.isCarSupported,
//     isMotorSupported: req.body.isMotorSupported,
//     isBikeSupported: req.body.isBikeSupported,
//     flat__amount: req.body.flat__amount,
//     flat__hours: req.body.flat__hours,
//     hour__amount: req.body.hour__amount,
//     hour__hours: req.body.hour__hours
//   });

//   newPost.save();

//   res.redirect('/Profile');
// }); 
