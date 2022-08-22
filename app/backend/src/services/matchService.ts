import TeamModel from '../database/models/teamModel';
import MatchModel from '../database/models/matchModel';
import { matchWithIdAssociated,
  matchWithIdUnassociated,
  matchWithoutIdUnassociatedBase } from './types/matchInterface';

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

  static async getByProgress(inProgress: boolean) {
    const response = await MatchModel.findAll({
      where: { inProgress },
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

  static async create(matchData: matchWithoutIdUnassociatedBase) {
    const response = await MatchModel.create({
      ...matchData,
      inProgress: true,
    }, { raw: true });

    return response as matchWithIdUnassociated;
  }

  static async finish(id: number) {
    const response = await MatchModel.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );
    console.log(response);

    return response;
  }
}
