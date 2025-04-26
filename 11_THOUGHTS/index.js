const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// models
const Thought = require('./models/Thought')
const User = require('./models/User')

// import routes
const thoughtsRoutes = require('./routes/thoughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// import controller
const ThoughtController = require('./controllers/ThoughtController')

// template engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//Receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {
    if (req.session.userid){
        res.locals.session = req.session
    }

    next()
})

//routes
app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)
app.get('/', ThoughtController.showThoughts)

conn
    //.sync({ force: true }) -> para sincronizar com o banco de dados
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))