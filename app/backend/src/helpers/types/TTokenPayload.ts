import { JwtPayload } from 'jsonwebtoken';

export interface TTokenPayload extends JwtPayload{
  user: {
    id: number
  }
}
