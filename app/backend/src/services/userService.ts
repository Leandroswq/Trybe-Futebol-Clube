import UserModel from '../database/models/userModel';
import { IUser } from './types/userInterface';

export default class userService {
  static async getByEmail(email: string) {
    const response = await UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
    return response as IUser;
  }

  static async getById(id: number) {
    const response = await UserModel.findByPk(id, {
      raw: true,
    });

    return response as IUser;
  }
}
