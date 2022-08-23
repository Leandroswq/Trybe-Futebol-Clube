import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardsService';

export default class LeaderBoardController {
  static async getAll(req: Request, res: Response) {
    const response = await LeaderBoardService.teste();

    res.status(200).json(response);
  }
}
