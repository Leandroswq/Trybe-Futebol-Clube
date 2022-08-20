import Joi = require('joi');
import HttpError from '../errors/httpError';
import { IUserLogin } from './types/userInterface';
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

  static validateLogin(login: IUserLogin) {
    const { email, password } = login;
    const data = {
      email,
      password,
    };
    this.validateLoginFieldsExist(data);
    return data;
  }
}
