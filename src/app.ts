import express from 'express';
import config from './config/config';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { connect } from './config/db';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const main = async () => {
  const app = express();

  // Connect to db
  await connect();
  logger.info('Connected to database!');

  // Config middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: config.web.baseUrl, credentials: true }));
  app.use(cookieParser());
  app.use(errorHandler);

  // Config routes
  app.use('/api/v1', routes);

  // Start listening
  app.listen(config.port, () => {
    logger.info(`App listening on the port ${config.port}`);
  });
};

main();
