import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/httpError';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { httpStatus, message } = err as HttpError;
  if (httpStatus) {
    res.status(httpStatus).json({ message });
  } else {
    res.status(500).json({ message: 'Erro interno do servidor' });
    console.log(err);
  }
}
