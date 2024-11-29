const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../template')
var globalID

router.post('/getid', (req, res)=>{
    const id = req.body.userid
    res.redirect(`/users/${id}`)
})

router.post('/validation', (req, res) =>{
    const user = req.body.user
    const pword = req.body.password
    const name = user + "_" + globalID
    const account = getAccount(name)

    if(!fs.existsSync("accounts")){
        fs.mkdirSync("accounts")
    }
    if(fs.existsSync(`accounts/${name}.json`)){
        if(account.password == pword){
            res.sendFile(`${basePath}/dashboard.html`)
        }
        else{
            let loginPage = fs.readFileSync(`${basePath}/login.html`, 'utf-8')
            loginPage = loginPage.replace('<h3 id="result"></h3>', '<h3 style="color: red; text-align: center;" id="result">Senha incorreta</h3>')
            res.send(loginPage)
        }
    }
    else{
        fs.writeFileSync(`./accounts/${name}.json`, `{"password": "${pword}"}`)
        console.log("Conta criada com sucesso")
        res.sendFile(`${basePath}/dashboard.html`)
    }
})

router.get('/register', (req, res) =>{
    res.sendFile(`${basePath}/register.html`)
})

router.get('/:id', (req, res)=>{
    const id = req.params.id
    globalID = id
    console.log('id:', id)
    res.sendFile(`${basePath}/login.html`)
})

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON)
}

module.exports = router