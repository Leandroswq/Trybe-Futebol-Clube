import * as express from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', LeaderBoardController.getScoreBoardHome);

export default leaderBoardRouter;
