import {Router} from 'express';
import Validator from '../Middlewares/Validator';
import AuthController from '../Controllers/AuthController';
import IsAuth from '../Middlewares/IsAuth';

const baseRoute = Router();
const authRoutes = Router();

authRoutes.post('/signin', Validator.checkEmpty, Validator.checkEmail, AuthController.signin);

authRoutes.post('/signup', Validator.checkEmpty, AuthController.signup);

baseRoute.use('/auth', authRoutes);

export default baseRoute;