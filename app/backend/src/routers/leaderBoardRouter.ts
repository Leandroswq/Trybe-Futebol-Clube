import * as express from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', LeaderBoardController.getScoreBoardHome);
leaderBoardRouter.get('/away', LeaderBoardController.getScoreBoardAway);

export default leaderBoardRouter;
