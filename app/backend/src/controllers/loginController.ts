import { Request, Response } from 'express';
import Token from '../helpers/token';
import userService from '../services/userService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const data = req.body;

    const user = await userService.getByEmail(data.email);

    const token = Token.generate({
      user: {
        id: user.id,
      },
    });

    res.status(200).json({ token });
  }
}
