const dateformat = require('dateformat');
const chalked = require('plugins/chalked');

/**
 * Interface that represents default console logger
 * @interface
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export interface DefaultLogger {
  error: (text: string) => void;
  warn: (text: string) => void;
  success: (text: string) => void;
  info: (text: string) => void;
}

/**
 * Console logger for tiny messages
 * @class
 * @implements {DefaultLogger}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
export class ConsoleLogger implements DefaultLogger {
  error (text: string) {
    const date = dateformat(new Date(), 'HH:MM:ss');
    chalked.red(`[${date}] [verbose] Error: ${text}`);
  }

  warn (text: string) {
    const date = dateformat(new Date(), 'HH:MM:ss');
    chalked.yellow(`[${date}] [verbose] Warn: ${text}`);
  }

  success (text: string) {
    const date = dateformat(new Date(), 'HH:MM:ss');
    chalked.green(`[${date}] [verbose] Success: ${text}`);
  }

  info (text: string) {
    const date = dateformat(new Date(), 'HH:MM:ss');
    console.log(`[${date}] [verbose] Info: ${text}`);
  }
}
