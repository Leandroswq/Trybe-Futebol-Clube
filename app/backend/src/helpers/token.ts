import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from './interface/ITokenPayload';

export default class Token {
  private static secrete = process.env.JWT_SECRET as string;

  static generate(payload: ITokenPayload) {
    const token = jwt.sign(payload, this.secrete, {
      expiresIn: '7d',
    });

    return token;
  }

  static validate(token: string) {
    const result = jwt.verify(token, this.secrete);

    return result as ITokenPayload;
  }
}
