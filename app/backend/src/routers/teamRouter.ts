import * as express from 'express';
import TeamController from '../controllers/teamController';

const teamRouter = express.Router();

teamRouter.get('/', TeamController.getAll);

export default teamRouter;
