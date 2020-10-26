import {Router} from 'express';
import Validator from '../Middlewares/Validator';
import ProductControllers from '../Controllers/ProductController';
import IsAuth from '../Middlewares/IsAuth';

const baseRoute = Router();
const productRoutes = Router();


productRoutes.post('/add-product', IsAuth.verifyAuth, Validator.adminRole, Validator.checkEmpty, ProductControllers.addProduct);

productRoutes.post('/edit-product/:product_id', IsAuth.verifyAuth, Validator.adminRole, Validator.checkEmpty, ProductControllers.editProduct );

productRoutes.get('/products', IsAuth.verifyAuth, Validator.adminRole, Validator.checkEmpty,  ProductControllers.getProducts)

productRoutes.delete('/product/:product_id', IsAuth.verifyAuth, Validator.adminRole, Validator.checkEmpty, ProductControllers.deleteProduct)

baseRoute.use('/product', authRoutes);

export default baseRoute;