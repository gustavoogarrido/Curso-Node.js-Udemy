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

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', { books })
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