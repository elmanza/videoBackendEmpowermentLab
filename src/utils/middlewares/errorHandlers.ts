import {config} from '../../config/index';
import { Request, Response, NextFunction } from "express";
import boom from '@hapi/boom';
// const debug = require('debug')('app:error');
// const Sentry = require('@sentry/node');

// Sentry.init({
//   dsn: config.sentryDSN,
//   environment: !config.dev ? 'PRODUCTION' : 'DEVELOPMENT',
//   tracesSampleRate: 1.0
// });

function withErrorStack(_error:any, _stack:any) {
  if (config.dev) return { ..._error, _stack };
  return _error;
}

function wrapErrors(err:any, req:Request, res:Response, next:NextFunction) {
  if (!err.isBoom) next(boom.badImplementation(err));
  next(err);
}

function logErrors(err:any, req:Request, res:Response, next:NextFunction) {
  // debug(err);
  next(err);
}

function errorHandler(err:any, req:Request, res:Response, next:NextFunction) {
  // eslint-disable-line
  // Sentry.captureException(err);

  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

export default { logErrors, wrapErrors, errorHandler };
