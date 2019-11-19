import { createLogger, format, transports } from 'winston';

const logger = createLogger();

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: format.json()
    })
  );
}

export default logger;
