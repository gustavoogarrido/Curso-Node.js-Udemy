import chalk from "chalk"
import inquirer from "inquirer"

inquirer.prompt([{
    name: "p1",
    message: "Digite o nome: "
},{
    name: "p2",
    message: "Digite a idade: "
}])
.then((answers) => {
    console.log(chalk.bgYellow(answers.p1))
    console.log(chalk.black(answers.p2))
})
.catch((err) => console.log("Erro: "), err)