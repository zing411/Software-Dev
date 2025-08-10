require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const transactionRoutes = require('./routes/transactions');
const goalRoutes = require('./routes/goals');
const ensureAuth = require('./middleware/auth');

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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

app.use('/auth', authRoutes);
app.use('/transactions', ensureAuth, transactionRoutes);
app.use('/goals', ensureAuth, goalRoutes);
app.use('/dashboard', ensureAuth, dashboardRoutes);

app.get('/', (req, res) => res.redirect('/auth/login'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});