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

  static async create(req: Request, res: Response) {
    const data = req.body;

    await MatchService.validateCreateMatch(data);
    const match = await MatchService.create(data);

    res.status(201).json(match);
  }

  static async finished(req: Request, res: Response) {
    const { id } = req.params;

    await MatchService.finish(Number(id));

    res.status(200).json({ message: 'Finished' });
  }

  static async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    await MatchService.updateGoals(Number(id), data);

    res.status(200).json({ message: 'Updated Goals' });
  }
}
