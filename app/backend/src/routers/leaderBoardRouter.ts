import * as express from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', LeaderBoardController.getAll);

export default leaderBoardRouter;
