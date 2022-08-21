import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import Token from '../helpers/token';
import 'express-async-errors';
import ICustomRequest from './types/customRequest';
import userService from '../services/userService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const data = req.body;

    const user = await LoginService.validateLogin(data);

    const token = Token.generate({
      user: {
        id: user.id,
      },
    });

    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const customRequest = req as ICustomRequest;
    const { id } = customRequest.user;
    const { role } = await userService.getById(id);

    res.status(200).json({ role });
  }
}
