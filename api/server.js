import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import HttpRoutes from './HttpRoutes';
import logger from '../lib/logger';
import { install } from 'source-map-support';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import getWebpackConfig from '../lib/getWebpackConfig';
import webpack from 'webpack';

install();

process.on('SIGINT', () => {
  process.exit(0);
});

const isDebug = !process.argv.includes('--release');
const isVerbose = !!process.argv.includes('--verbose');
const watch = !!process.argv.includes('--watch');
const stats = !!process.argv.includes('--stats');


const corsMiddleware = cors({ origin: '*', preflightContinue: true });
const app = express();


app.use(corsMiddleware);
app.options('*', corsMiddleware);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/node_modules', express.static(path.join('..', '/node_modules')));
app.use('/public', express.static(path.join('.', '/dist/client')));
app.use(HttpRoutes);
if (process.env.API_PORT) {
  app.listen(process.env.API_PORT, (err) => {
    if (err) {
      logger.error(err);
    }
    logger.info(
      '\n --- \n',
      `==>  API is running on port ${process.env.API_PORT}`,
      '\n',
      `==>  Send requests to http://${process.env.API_HOST}:${process.env.API_PORT}`,
      '\n',
      '--- \n'
    );
    if (process.send) process.send('ready');
  });
} else {
  logger.error(
    '==>     ERROR: No PORT environment variable has been specified'
  );
}
export default app;
