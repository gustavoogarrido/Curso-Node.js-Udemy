const express = require("express")
const app = express()
const port = 3000
const path  = require("path")
const basePath = path.join(__dirname, "templates")

app.get("/", (req, res) =>{
    res.send("deu certo")
})

app.listen(port, () =>{
    console.log("Executando na porta", port)
})