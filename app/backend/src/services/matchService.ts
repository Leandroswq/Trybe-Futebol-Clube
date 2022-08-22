import TeamModel from '../database/models/teamModel';
import MatchModel from '../database/models/matchModel';
import { matchWithIdAssociated } from './types/matchInterface';

export default class MatchService {
  static async getAll() {
    const response = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    const matches = JSON.parse(JSON.stringify(response));

    return matches as matchWithIdAssociated[];
  }
}
