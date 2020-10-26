import Product from '../Models/Product';
import Utils from '../Utils/Utility';

class ProductControllers{
    static async addProduct(){
        const {productName, productPrice, productQuantity, description, category} = req.body;

        const {userId} = req;

        try {
            const checkExistence = await Product.find({productName})
            if(checkExistence.length > 0 ){
                return Utils.api_response(res, 400, 'Product name already exist😫')
            }else{
                const newProduct = new Product({
                    name: productName,
                    price: Number(productPrice),
                    quantity: Number(productQuantity),
                    description: description,
                    category: category,
                    admin: userId
                })

                newProduct.save( saveProduct => {
                    return Utils.api_response(res,201, 'New product created successfully 👍', null, saveProduct);
                } ).catch(err => {
                    return Utils.appError(err, next);
                })
            }
        } catch (error) {
            return Utils.appError(error, next);
        }
   

    }

    static async editProduct(){
        const {product_id} = req.params;

        try {

            const updateProduct = await Product.findByIdAndUpdate(product_id, req.body, {
                new: true,
                runValidators: true
            }).exec();
            return Utils.api_response(res,200, 'Product updated successfully 👍', null, updateProduct);
        }catch(err){
            return Utils.appError(err, next);
        }
    }

    static async getProducts(){

        const {userId} = req;

        try {
            const findAdmin = await Product.find({admin:userId}).exec();

            if(findAdmin.length == 0){
                return Utils.api_response(res, 404, 'You do not have any product yet 😔!!!')
            }else{
                return Utils.api_response(res, 200, 'list of your products', null, findAdmin)
            }

        } catch (error) {
            return Utils.appError(error, next)
        }
    }

    static async deleteProduct(){
        const { product_id } = req.params;
        try {
            const deleteP = await Product.findByIdAndDelete(product_id).exec();
            return Utils.api_response(res, 200, 'Product deleted successfully')
        } catch (error) {
            return Utils.appError(error, next)
        }
    }
}


export default ProductControllers