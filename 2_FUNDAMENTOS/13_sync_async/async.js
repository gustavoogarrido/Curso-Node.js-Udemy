const fs = require("fs")
console.log("Inicio")

fs.writeFile("arquivo.txt", "kkkkkkkk", function(err){
    setTimeout(function(){
        console.log("arquivo criado!!!")
    }), 2000
})

console.log("Fim")