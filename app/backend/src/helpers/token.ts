import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import HttpError from '../errors/httpError';
import { TTokenPayload } from './types/tokenPayload';

export default class Token {
  private static secrete = process.env.JWT_SECRET as string;

  static generate(payload: TTokenPayload) {
    const token = jwt.sign(payload, this.secrete, {
      expiresIn: '7d',
    });

    return token;
  }

  static validate(token: string) {
    let result;
    try {
      result = jwt.verify(token, this.secrete);
    } catch (err) {
      throw new HttpError(401, 'Token must be a valid token');
    }
    return result as TTokenPayload;
  }
}
