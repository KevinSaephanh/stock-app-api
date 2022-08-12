import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    })
  ),
  transports: [new transports.Console()],
});
