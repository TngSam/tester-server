import * as winston from 'winston';
import { Format, TransformableInfo } from 'logform';
const {
  printf, combine, timestamp, label,
  colorize, metadata
} = winston.format;
const LEVEL: symbol = Symbol.for('level');
const LOGGER_NAME = 'database';

/**
 * Logger format
 * @type {Format}
 */
const format: Format = combine(
  colorize(),
  metadata(),
  label({ label: 'db' }),
  timestamp({
    format: 'DD/MM - HH:mm:ss'
  }),
  printf((info: TransformableInfo) => {
    const { timestamp, label, metadata, message }: any = info;
    let str = `${timestamp} ${label} [${metadata.handler || 'unknown'}/${metadata.method || '?'}] - ${message}`;
    if (metadata.data) {
      str += `\n\t\t\t\t${JSON.stringify(metadata.data)}`;
    }
    return str;
  })
);

/**
 * Logger transports
 * @type {{filename: (any|string); maxsize: number}}
 */
const transportOpts: winston.transports.FileTransportOptions = {
  filename: process.env.DB_LOG_FILENAME || 'logs_db.log',
  maxsize: 5000000
};
const transports = [
  new winston.transports.File(transportOpts)
];

/**
 * Logger options
 * @type {{format: Format; transports: winston.FileTransportInstance[]; exitOnError: boolean}}
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const loggerOptions: winston.LoggerOptions = {
  [LEVEL]: 'info',
  format,
  transports,
  exitOnError: false
};

/**
 * Init logger
 * @returns {string} - Logger name
 * @author Samir Amirseidov <famirseidov@gmail.com>
 */
const initLogger = () => {
  winston.loggers.add('database', loggerOptions);
  return LOGGER_NAME;
};
export default initLogger;
