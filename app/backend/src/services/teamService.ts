import TeamModel from '../database/models/teamModel';
import { ITeam } from './types/teamInterface';

export default class TeamService {
  static async getAll() {
    const response = await TeamModel.findAll({ raw: true });

    return response as ITeam[];
  }

  static async getById(id: number) {
    const response = await TeamModel.findByPk(id, { raw: true });

    return response as ITeam;
  }
}
