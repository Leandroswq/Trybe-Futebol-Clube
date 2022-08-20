import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import Token from '../helpers/token';
import userService from '../services/userService';
import 'express-async-errors';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const data = req.body;

    const login = LoginService.validateLogin(data);

    const user = await userService.getByEmail(login.email);

    const token = Token.generate({
      user: {
        id: user.id,
      },
    });

    res.status(200).json({ token });
  }
}
