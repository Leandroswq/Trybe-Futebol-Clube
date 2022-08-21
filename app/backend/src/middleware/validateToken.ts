import { NextFunction, Request, Response } from 'express';
import ICustomRequest from '../controllers/types/customRequest';
import Token from '../helpers/token';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization as string;

  const payload = Token.validate(token);

  const customRequest = req as ICustomRequest;
  customRequest.user = payload.user;

  next();
}
