const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual a sua linguagem preferida?\n", (language) => {
    console.log(`A sua linguagem preferida é: ${language}`)
    readline.close()
})
