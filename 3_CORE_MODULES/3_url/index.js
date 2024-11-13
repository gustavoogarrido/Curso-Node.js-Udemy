const url = require("url")
const addres = "https://www.vaitomanocu.com.br/vaito?mano=cu"
const parsedUrl = new url.URL(addres)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get("mano"))