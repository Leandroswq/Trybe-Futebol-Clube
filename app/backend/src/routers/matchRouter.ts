import * as express from 'express';
import validateToken from '../middleware/validateToken';
import MatchController from '../controllers/matchController';

const matchRouter = express.Router();

matchRouter.get('/', MatchController.getAll);
matchRouter.post('/', validateToken, MatchController.create);

matchRouter.put('/:id', MatchController.finished);

export default matchRouter;
