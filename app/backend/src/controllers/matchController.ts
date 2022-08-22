import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const inProgress = req.query.inProgress as string;

    let matches;

    if (inProgress) {
      const booleanInProgress = inProgress.toLowerCase() === 'true';
      matches = await MatchService.getByProgress(booleanInProgress);
    } else {
      matches = await MatchService.getAll();
    }

    res.status(200).json(matches);
  }
}
