//Mod externos
import chalk from "chalk"
import inquirer from "inquirer"

//Mod interno
import fs from "fs"
import { stringify } from "querystring"

operation()

function operation() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "O que voce deseja fazer?",
        choices: ["Criar contas", "Consultar saldo", "Depositar", "Sacar", "Sair"]
    },]).then((answer) => {
        const action = answer['action']

        if (action === "Criar contas") {
            createAccount()
        }
        else if (action === "Depositar") {
            deposit()
        }
        else if (action === "Consultar saldo") {
            getAccountBalance()

        }
        else if (action === "Sacar") {
            withdraw()
        }
        else if (action === "sair") {
            console.log(chalk.bgBlue.black("Obrigado por usar nosso banco!"))
            process.exit()
        }

    }).catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([{
        name: "accountName",
        message: "Digite um nome para a sua conta: "
    }]).then((answer) => {
        const accountName = answer["accountName"]
        console.info(accountName)

        if (!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts")
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Conta ja existente!"))
            buildAccount()
            return
        }
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err)
        },)
        console.log(chalk.green("Conta criada com sucesso"))
        operation()
    }).catch((err) => console.log(err))
}

// add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        //verify if account exists
        if (!checkAccount(accountName)) {
            return deposit()
        }
        inquirer.prompt([
            {
                name: "amount",
                message: "Quanto voce deseja depositar?",
            },
        ]).then((answer) => {
                const amount = answer["amount"]
                // add an amount
                addAmount(accountName, amount)
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }
    
    //withdraw an amount from user account
    function withdraw(){
        inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        //verify if account exists
        if (!checkAccount(accountName)) {
            return withdraw()
        }
        inquirer.prompt([
            {
                name: "amount",
                message: "Quanto voce deseja sacar?",
            },
        ]).then((answer) => {
            const amount = answer["amount"]
            // withdraw an amount
            removeAmount(accountName, amount)
        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}


    function checkAccount(accountName) {
        if (!fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Esta conta não existe!"))
            return false
        }
        return true
    }
    
    function addAmount(accountName, amount) {
        const accountData = getAccount(accountName)
        if (!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde"))
        return deposit()
    }
    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    },)
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
    operation()
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf8",
        flag: "r"
    })
    return JSON.parse(accountJSON)
}

// show account balance
function getAccountBalance(){
    inquirer.prompt([{
        name:"accountName",
        message:"Qual o nome da sua conta? ",
    }]).then(answer =>{
        const accountName = answer["accountName"]
        const accountData = getAccount(accountName)
        //verify if account exists
        if(checkAccount(accountName))
            {
                console.log(chalk.bgBlue.black(`Olá ${accountName}, o seu saldo é de R$${accountData.balance}`))
                operation()
            }
            else{
                getAccountBalance()
            }
    }).catch(err => console.log(err))
}

//withdraw an amount from the account balance
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if (!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde"))
        return withdraw()
    }
    else if (accountData.balance < amount){
        console.log(chalk.bgRed("Saldo insuficiente, tente outro valor"))
        return withdraw()
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    },)
    console.log(chalk.green(`Foi sacado o valor de R$${amount} na sua conta`))
    operation()
}