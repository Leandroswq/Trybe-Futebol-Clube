import { JwtPayload } from 'jsonwebtoken';

export interface ITokenPayload extends JwtPayload{
  user: {
    userId: string
  }
}
