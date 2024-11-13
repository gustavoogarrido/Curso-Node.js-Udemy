const _ = import("lodash")
const chalk = import("chalk")

const a = [1, 2, 3, 4, 5]
const b = [2, 4, 6, 7, 8]

console.log(chalk.red(_.difference(a, b)))