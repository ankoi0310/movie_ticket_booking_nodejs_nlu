import { createLogger, transports, format } from "winston";
import fs from "fs";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import { environment, logDirectory } from "../../config/app";

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

// Create directory if it doesn't exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'info';


const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: `${dir}/%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  handleExceptions: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
  ),
});

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
    dailyRotateFile,
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
});