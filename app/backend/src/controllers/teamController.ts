import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  static async getAll(_req: Request, res:Response) {
    const teams = await TeamService.getAll();

    res.status(200).json(teams);
  }
}
