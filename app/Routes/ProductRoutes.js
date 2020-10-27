import {Router} from 'express';
import Validator from '../Middlewares/Validator';
import ProductControllers from '../Controllers/ProductController';
import IsAuth from '../Middlewares/IsAuth';

const baseRoute = Router();
const productRoutes = Router();


productRoutes.post('/add-product', IsAuth.verifyAuth, Validator.adminRole, Validator.checkEmpty, ProductControllers.addProduct);

productRoutes.patch('/edit-product/:product_id', IsAuth.verifyAuth, Validator.adminRole, Validator.checkUpdateParams, ProductControllers.editProduct );

productRoutes.get('/products', IsAuth.verifyAuth,  ProductControllers.getProducts)

productRoutes.delete('/delete/:product_id', IsAuth.verifyAuth, Validator.adminRole, ProductControllers.deleteProduct)

productRoutes.get('/categories', IsAuth.verifyAuth, ProductControllers.getCategories)

baseRoute.use('/product', productRoutes);

export default baseRoute;
