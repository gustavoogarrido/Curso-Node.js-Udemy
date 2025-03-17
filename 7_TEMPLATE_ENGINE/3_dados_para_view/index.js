const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) =>{
    const user = {
        name: "gustavo",
        surname: "naosei"
    }

    res.render('home', {user: user})
})

app.listen(3000, () =>{
    console.log("Ta funcionando")
})