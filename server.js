const express = require('express')
const app = express()

app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    res.send('test')
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.listen(3000)