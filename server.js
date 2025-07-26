const express = require('express')
const app = express()

app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    res.send('test')
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(3000)