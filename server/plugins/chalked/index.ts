import chalk from 'chalk';

/**
 * Wrapper for console.log(chalk.color())
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
module.exports = {
  red: (msg: string) => console.log(chalk.red(msg)),
  green: (msg: string) => console.log(chalk.green(msg)),
  blue: (msg: string) => console.log(chalk.blue(msg))
};
