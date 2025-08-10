require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const transactionRoutes = require('./routes/transactions');
const goalRoutes = require('./routes/goals');
const ensureAuth = require('./middleware/auth');
const checkUser = require('./middleware/user');

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// app.get("/", (req, res) => {
//     res.send('test')
// })

// app.get("/home", (req, res) => {
//     res.render("home")
// })

// app.get("/register", (req, res) => {
//     res.render("register")
// })

// app.get("/login", (req, res) => {
//     res.render("login")
// })

app.use('/auth', checkUser, authRoutes);
app.use('/transactions', ensureAuth, checkUser, transactionRoutes);
app.use('/goals', ensureAuth, checkUser, goalRoutes);
app.use('/dashboard', ensureAuth, checkUser, dashboardRoutes);

app.get('/', (req, res) => res.redirect('/auth/login'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});