const http = require("http")

const port = 3000
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Contenty-Type", "text/html")
    res.end("<h1>VAI TOMA NO CU PORRA!</h1>")
})

server.listen(port, () =>{
    console.log("Servidor rodando na porta ", port)
})