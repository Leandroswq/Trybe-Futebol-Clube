import * as express from 'express';
import validateToken from '../middleware/validateToken';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

loginRouter.post('/', LoginController.login);
loginRouter.get('/validate', validateToken, LoginController.validate);

export default loginRouter;
