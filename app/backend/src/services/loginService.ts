import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import HttpError from '../errors/httpError';
import { IUserLogin } from './types/userInterface';
import userService from './userService';
import ValidationMessages from './validationMessages';

export default class LoginService {
  static validateLoginFieldsExist(login: IUserLogin) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const response = schema.validate(login);
    if (response.error) {
      throw new HttpError(400, ValidationMessages.anyFieldMissing());
    }
    return true;
  }

  static async validateLoginValues(login: IUserLogin) {
    const user = await userService.getByEmail(login.email);

    const error = new HttpError(
      401,
      ValidationMessages.incorrectPasswordOrEmail(),
    );

    if (!user) throw error;
    const validPassword = bcrypt.compareSync(login.password, user.password);
    if (!validPassword) throw error;
    return user;
  }

  static async validateLogin(login: IUserLogin) {
    const { email, password } = login;
    const data = {
      email,
      password,
    };
    this.validateLoginFieldsExist(data);

    const user = await this.validateLoginValues(data);
    return user;
  }
}
