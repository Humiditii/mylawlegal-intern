import {Router} from 'express';
import Validator from '../Middlewares/Validator';
import ProductControllers from '../Controllers/ProductController';
import IsAuth from '../Middlewares/IsAuth';

const baseRoute = Router();
const productRoutes = Router();


productRoutes.post('/signin', Validator.checkEmpty, Validator.checkEmail, AuthController.signin);

productRoutes.post('/signup', Validator.checkEmpty, Validator.checkEmail, AuthController.signup);

baseRoute.use('/product', authRoutes);

export default baseRoute;