import { Request, Response } from "express";
import * as boom from '@hapi/boom';

export default function notFoundHandler(req: Request, res: Response) {
  const {
    output: { statusCode, payload }
  } = boom.notFound();
  res.status(statusCode).json(payload);
}
