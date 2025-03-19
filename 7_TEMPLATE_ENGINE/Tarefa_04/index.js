const fs = require('fs')
const express = require('express')
const handlebars = require('express-handlebars')
const { register } = require('module')
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
    registerPage = fs.readFileSync('/views/register.html')

    if(verifyAccount && username.length > 0){
        if(userpassword == userpasswordconf){
            //criar json da conta
            let accountData = {
                name: username,
                usersurname: usersurname,
                userpassword: userpassword
            }
            createAccount(accountData)
            registerPage.replace('<h3 id="warning"></h3>', '<h3 id="warning" Style="text-align: center; color: green;">Seu registro foi efetuado com sucesso</h3>')
        }
        else{
            registerPage.replace('<h3 id="warning"></h3>', '<h3 id="warning" Style="text-align: center; color: red;">As senhas não são iguais</h3>')
        }
    }
    else{
        registerPage.replace('<h3 id="warning"></h3>', '<h3 id="warning" Style="text-align: center; color: red;">Ocorreu um erro ao criar a conta</h3>')
    }

})

app.get('/login', (req, res) => {
    username = req.body.name
    password = req.body.password


    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/', (req, res) => {
    res.render('home')
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
    if(fs.existsSync(`/accounts/${accountName}`)){
        return false
    }
    else{
        return true
    }
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON)
}

function createAccount(accountData){
    fs.writeFileSync(`accounts/${accountData.name}.json`, `{\n"surname": "${accountData.surname}",\n "password": "${accountData.password}"}`)
}