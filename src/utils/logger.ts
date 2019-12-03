import { createLogger, format, transports } from 'winston';
import config from './config';

const logger = createLogger();

if (config.DEVELOPMENT) {
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
