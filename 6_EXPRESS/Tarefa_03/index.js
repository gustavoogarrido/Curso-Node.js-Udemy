const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const users = require('./users/index.js')

app.set('view engine', 'ejs')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(express.static('public'))

const basePath = path.join(__dirname, 'template')

app.use('/users', users)

app.get('/', (req, res) =>{
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req, res, next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, ()=>{
    console.log('Executando porta ', port)
})