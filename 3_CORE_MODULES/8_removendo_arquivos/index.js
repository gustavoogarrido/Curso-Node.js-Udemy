const http = require("http")
const url = require("url")
const fs = require("fs")


const port = 3000
const server = http.createServer((req, res) => {
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name
    if (!name) {
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write(data)
            return res.end()
        })
    }
    else if (name.toUpperCase() == "REMOVER") {
        fs.unlink("arquivo.txt", function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log("Arquivo removido com sucesso")
        })
    }
    else {
        fs.appendFile("arquivo.txt", name + "\r\n", function (err, data) {
            res.writeHead(302, {
                location: "/",
            })
            return res.end()
        })
    }

})
server.listen(port, () => {
    console.log("Servidor rodando na porta ", port)
})