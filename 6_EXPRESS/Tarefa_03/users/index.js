const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../template')
var globalID

router.post('/getid', (req, res) => {
    console.log(req.body.userid)
    res.redirect(`/users/validation`)
})

router.post('/validation', (req, res) => {
    const user = req.body.user
    const passw = req.body.password
    const accountData = getAccount(user)
    let loginPage = fs.readFileSync(`${basePath}/validation.html`, 'utf-8')

    if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts")
    }

    if (fs.existsSync(`accounts/${user}.json`)) {
        if (accountData.passw == passw)
            res.redirect(`./dashboard`)
        else{
            loginPage = loginPage.replace('<h3 id="result"></h3>', '<h3 style="color: red; text-align: center;" id="result">Usuário ou senha incorreta</h3>')
            res.send(loginPage)
        }
    }
    else {
        loginPage = loginPage.replace('<h3 id="result"></h3>', '<h3 style="color: red; text-align: center;" id="result">Usuário ou senha incorreta</h3>')
        res.send(loginPage)
    }

})

router.post('/forgotpassw', (req, res) =>{
    const user = req.body.user
    const newpassw = req.body.npassw
    const confirmpassw = req.body.confirmpassw
    let forgotPage = fs.readFileSync(`${basePath}/forgotpassw.html`, 'utf-8')

    if(!fs.existsSync(`accounts/${user}.json`)){
        forgotPage = forgotPage.replace('<h3 class="title"></h3>', '<h3 class="title" id="warning" style="color: red;">Essa conta não existe</h3>')
    }
    else{
        if(confirmpassw == newpassw){
            let userdata = getAccount(user)
            userdata.passw = `${newpassw}`
            fs.writeFileSync(`./accounts/${user}.json`, JSON.stringify(userdata, null, 2))
            res.send(forgotPage = forgotPage.replace('<h3 class="title" id="warning"></h3>', '<h3 class="title" id="warning" style="color: green;">Senha alterada com sucesso</h3>'))
        }
    }
})

router.post('/register', (req, res) => {
    let registerPage = fs.readFileSync(`${basePath}/register.html`, 'utf-8')
    if (req.body.passw == req.body.confirmpassw) {
        if(fs.existsSync(`accounts/${req.body.name}.json`)) {
            registerPage = registerPage.replace('<h3 class="title" id="warning"></h3>', '<h3 class="title" id="warning" style="color: red;">Essa conta ja existe</h3>')
            res.send(registerPage)
        }
        else {
            fs.writeFileSync(`accounts/${req.body.name}.json`, `{"lastname": "${req.body.lastname}", "age": "${req.body.age}", "passw": "${req.body.passw}"}`, function (err) {
                console.log(err)
            },)
            res.sendFile(`${basePath}/dashboard.html`)
        }
    }
    else{
        registerPage = registerPage.replace('<h3 class="title" id="warning"></h3>', '<h3 class="title" id="warning" style="color: red;">As senhas não são iguais</h3>')
        res.send(registerPage)        
    }
})

router.get('/dashboard', (req, res) =>{
    res.sendFile(`${basePath}/dashboard.html`)
})

router.get('/forgotpassw', (req, res)=>{
    res.sendFile(`${basePath}/forgotpassw.html`)
})

router.get('/register', (req, res) => {
    res.sendFile(`${basePath}/register.html`)
})

router.get('/validation', (req, res) => {
    res.sendFile(`${basePath}/validation.html`)
})

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON)
}

module.exports = router