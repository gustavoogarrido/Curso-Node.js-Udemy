const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

const auth = true

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/', (req, res) =>{
    const user = {
        name: "gustavo",
        surname: "naosei"
    }

    res.render('home', {user: user, auth})
})

app.listen(3000, () =>{
    console.log("Ta funcionando")
})