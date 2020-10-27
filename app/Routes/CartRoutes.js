import {Router} from 'express';
import Validator from '../Middlewares/Validator';
import IsAuth from '../Middlewares/IsAuth';
import CartController from '../Controllers/CartController';

const baseRoute = Router();
const cartRoutes = Router();

cartRoutes.get('/my_cart', IsAuth.verifyAuth, CartController.getCart);

cartRoutes.post('/move_to_cart/:item_id', IsAuth.verifyAuth, CartController.moveToCart);

cartRoutes.post('/purchase', IsAuth.verifyAuth, CartController.purchase);

cartRoutes.get('/purchase/details', IsAuth.verifyAuth, Validator.adminRole, CartController.purchase);

cartRoutes.delete('/delete/:product_id', IsAuth.verifyAuth, CartController.removeFromCart);

baseRoute.use('/cart', cartRoutes);

export default baseRoute;