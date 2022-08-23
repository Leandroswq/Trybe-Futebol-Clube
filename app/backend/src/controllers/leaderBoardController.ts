import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardsService';

export default class LeaderBoardController {
  static async getScoreBoardHome(req: Request, res: Response) {
    const response = await LeaderBoardService.getScoreBoardHome();

    res.status(200).json(response);
  }

  static async getScoreBoardAway(req: Request, res: Response) {
    const response = await LeaderBoardService.getScoreBoardAway();

    res.status(200).json(response);
  }

  static async getScoreBoard(req: Request, res: Response) {
    const response = await LeaderBoardService.getScoreBoard();

    res.status(200).json(response);
  }
}
