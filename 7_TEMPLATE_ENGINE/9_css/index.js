const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

const hbs = handlebars.create({
    partialsDir: ['views/partials']
})

const auth = true
const approved = true

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/register', (req, res) =>{
    res.render('register')
})

app.get('/dashboard', (req, res) => {
    const items = ["Item A", "Item B", "Item C"]

    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Voce vai aprender node.',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender node.js',
            category: 'JavaScript',
            body: 'teste',
            comments: 4,
        },
        {
            title: 'Aprender PHP',
            category: 'JavaScript',
            body: 'teste',
            comments: 4,
        },
        {
            title: 'Aprender python',
            category: 'JavaScript',
            body: 'teste',
            comments: 4,
        }
    ]

    res.render('blog', {posts})
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