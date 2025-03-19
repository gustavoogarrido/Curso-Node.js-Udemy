const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

const auth = true
const approved = true

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/dashboard', (req, res) => {
    const items = ["Item A", "Item B", "Item C"]

    res.render('dashboard', {items})
})

app.get('/', (req, res) =>{
    const user = {
        name: "gustavo",
        surname: "naosei"
    }

    res.render('home', {user: user, auth, approved})
})

app.listen(3000, () =>{
    console.log("Ta funcionando")
})