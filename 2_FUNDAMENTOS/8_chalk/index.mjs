import chalk from "chalk";

const nota = 6;

if (nota >= 7) {
  console.log(chalk.green.bold("Parabens voce está aprovado!"));
} else {
  console.log(chalk.black.bgRed("REPROVADO"));
}
