import Product from '../Models/Product';
import Utils from '../Utils/Utility';

class ProductControllers{
    static async addProduct(req, res, next){
        const {productName, productPrice, productQuantity, description, category} = req.body;
        const {userId} = req;

        try {
            const checkExistence = await Product.find({name:productName})
            
            if(checkExistence.length > 0 ){
                return Utils.api_response(res, 400, 'Product name already exist😫')
            }else{
                const newProduct = new Product({
                    name: productName,
                    price: Number(productPrice),
                    quantity: Number(productQuantity),
                    description: description,
                    category: category,
                    admin:
                     userId
                })

                newProduct.save().then( saveProduct => {
                    return Utils.api_response(res,201, 'New product created successfully 👍', null, saveProduct);
                }).catch(err => {
                    return Utils.appError(err, next);
                })
            }
        } catch (error) {
            return Utils.appError(error, next);
        }
   

    }

    static async editProduct(req, res, next){
        const {product_id} = req.params;
        const {productName, productPrice, productQuantity, description, category} = req.body;
        const {userId} = req;


        try {

            const updateProduct = await Product.findByIdAndUpdate(product_id, {
                name: productName,
                price: Number(productPrice),
                quantity: Number(productQuantity),
                description: description,
                category: category,
                admin: userId
            }, {
                new: true,
                runValidators: true
            }).exec();
            return Utils.api_response(res,200, 'Product updated successfully 👍', null, updateProduct);
        }catch(err){
            return Utils.appError(err, next);
        }
    }

    static async getProducts(req, res, next){
           
        /**
         * Implementing Pagination 
         */

        const PAGE_SIZE = 10;

        const {userId} = req;
        const {category, page} = req.query;

        const page_count = !page ? 1 : page
      
        const skipper = ( page_count - 1 ) * PAGE_SIZE;
        

        try {

            const products = category ?  
            await Product.find({admin:userId, category: category}).skip(skipper).limit(PAGE_SIZE).exec(): 
            await Product.find({admin:userId}).exec();

            if(products.length == 0){
                return Utils.api_response(res, 404, 'You do not have any product yet 😔!!!')
            }else{
                return Utils.api_response(res, 200, 'list of your products', null, products)
            }

        } catch (error) {
            return Utils.appError(error, next)
        }
    }

    static async deleteProduct(req, res, next){
        const { product_id } = req.params;
        try {
            const deleteP = await Product.findByIdAndDelete(product_id).exec();
            return Utils.api_response(res, 200, 'Product deleted successfully')
        } catch (error) {
            return Utils.appError(error, next)
        }
    }

    static async getCategories(req, res, next){
        const {userId} = req;

        try {
            const categories = await Product.find({admin:userId}).select('category').exec();

            return Utils.api_response(res, 200, 'Categories available', null, categories)
        } catch (error) {
            return Utils.appError(error, next)
        }
    }
}


export default ProductControllers