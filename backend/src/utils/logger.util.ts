import winston from "winston";
import morgan, { StreamOptions } from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../.env" });

// Different log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Set log levels based on the application ENV
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

//Colors for each log level
const colors = {
  error: "red",
  warn: "yellow",
  info: ["green", "bold", "underline"],
  http: "magenta",
  debug: "blue",
};
winston.addColors(colors);

/**
 * Adding a timestamp and color to each log message
 * @example `${timestamp} ${level}: ${message}`
 * @example log 2022-01-24 18:33:38:3338 http: GET /users 200 198 - 15.910 ms
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  //Comment out in production to avoid printing color codes to file logs
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp}: ${info.level}: ${info.message}`
  )
);

// Save logs to files - error.log and all.log
const transports = [
  new winston.transports.Console(),

  // Uncomment to save logs to file - preferably in production

  // new winston.transports.File({
  //   filename: "logs/error.log",
  //   level: "error",
  // }),
  // new winston.transports.File({
  //   filename: "logs/all.log",
  // }),
];

/**
 * CreateLog
 * @methods info, warn, error, http, debug
 * @param {string} message - The message to log
 * @example CreateLog.info('This is a message');
 *
 */
export const CreateLog = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Overriding the stream method
// so that Morgan can use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Using the http level to log http requests
  write: (message) => CreateLog.http(message),
};

// Skip all Morgan http logs if the app is not running in development mode.
// only print warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Building the morgan middleware
export const Logger = morgan(
  // Define message format string
  // This is customizable
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

CreateLog.info(process.env.NODE_ENV);
