const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
let user

const hbs = handlebars.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.post('/register', (req, res) => {
    username = req.body.name
    usersurname = req.body.surname
    userpassword = req.body.password
    userpasswordconf = req.body.confirmpassword
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log("Servidor ativo")
})