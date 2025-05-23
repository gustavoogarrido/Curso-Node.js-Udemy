const fs = require('fs')
const express = require('express')
const handlebars = require('express-handlebars')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '/views')
const app = express()
const port = 3000
auth = fs.readFileSync('./auth/auth', "utf-8")

app.use(express.json())
app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true,
    }),
)

const hbs = handlebars.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.post('/register', (req, res) => {
    const username = req.body.username
    const usersurname = req.body.surname
    const userpassword = req.body.password
    const userpasswordconf = req.body.confirmpassword
    let success = false
    let failurepassw = false
    let failureacc = false
    let registerPage = fs.readFileSync(`${basePath}/register.handlebars`, 'utf-8')

    if(verifyAccount(username)){
        if(userpassword == userpasswordconf){
            createAccount(username, usersurname, userpassword)
            success = true
        }
        else{
            failurepassw = true
        }
    }
    else{
        failureacc = true
    }
    res.render('register', {success, failurepassw, failureacc})

})

app.post('/login',  (req, res) => {
    const username = req.body.username
    const password = req.body.password
    let failure = false

    if(!verifyAccount(username)){
        userAccount = getAccount(username)
        if(userAccount.password == password){
            authenticated()
            res.redirect(`/${username}/dashboard`)
        }
        else{
            failure = true
            res.render('login', {failure})
        }
    }
    else{
        failure = true
        res.render('login', {failure})
    }
})

app.post('/:id/changeInfo', (req, res) => {
    newUser = req.body.name
    newSurname = req.body.surname
    oldPassword = req.body.oldPassword
    newPassword = req.body.newPassword

})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get(`/:id/dashboard`, (req, res) => {
    auths = auth
    console.log(auths)
    authUser = getAccount(req.params.id)
    res.render('dashboard', {auths, authUser})
})

app.get('/:id/changeInfo', (req, res) => {
    authUser = getAccount(req.params.id)
    res.render('changeInfo', {authUser})
})

app.get('/', (req, res) => {
    unauthenticated()
    res.render('home', {auth: auth.auth})
})

app.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log("Servidor ativo")
})

function verifyAccount(accountName){
    if(!fs.existsSync('accounts')){
        fs.mkdirSync('accounts')
    }
    if(!fs.existsSync(`./accounts/${accountName}.json`)){
        return true
    }
    else{
        return false
    }
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`./accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON)
}

function createAccount(name, surname, password){
    fs.writeFileSync(`./accounts/${name}.json`, `{\n"name": "${name}",\n"surname": "${surname}",\n"password": "${password}"\n}`, function(err){
        console.log(err)
    })
}

function authenticated(){
    fs.writeFileSync(`./auth/auth`, "true")
}

function unauthenticated(){
    fs.writeFileSync(`./auth/auth`, "false")
}