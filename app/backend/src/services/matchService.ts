import TeamModel from '../database/models/teamModel';
import MatchModel from '../database/models/matchModel';
import { matchGoals, matchWithIdAssociated,
  matchWithIdUnassociated,
  matchWithoutIdUnassociatedBase } from './types/matchInterface';
import HttpError from '../errors/httpError';
import TeamService from './teamService';

export default class MatchService {
  static validateTeamsAreDifferent(data: matchWithoutIdUnassociatedBase) {
    console.log('//////', data.awayTeam === data.homeTeam);

    if (data.awayTeam === data.homeTeam) {
      throw new HttpError(401, 'It is not possible to create a match with two equal teams');
    }
  }

  static async validateCreateMatch(data: matchWithoutIdUnassociatedBase) {
    this.validateTeamsAreDifferent(data);
    const team1 = await TeamService.getById(data.homeTeam);
    const team2 = await TeamService.getById(data.awayTeam);

    if (!team1 || !team2) throw new HttpError(404, 'There is no team with such id!');
  }

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
      inProgress: false,
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

    return response;
  }

  static async updateGoals(id: number, gols: matchGoals) {
    const response = await MatchModel.update(
      {
        homeTeamGoals: gols.homeTeamGoals,
        awayTeamGoals: gols.awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );

    return response;
  }
}
