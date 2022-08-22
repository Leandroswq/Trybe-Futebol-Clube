import * as express from 'express';
import MatchController from '../controllers/matchController';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.getAll);

export default matchRouter;
