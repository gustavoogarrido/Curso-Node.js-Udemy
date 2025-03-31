const express = require('express')
const handlebars = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqtd = req.body.pageqtd

    const sql = `INSERT INTO books (title, pageqtd) VALUES ('${title}', '${pageqtd}')`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }

        res.redirect('/')
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
})

conn.connect(function(err) {
    if(err) {
        console.log(err)
    }
    console.log('Conectado ao Banco de Dados')
    app.listen(3000)
})