import Utils from '../Utils/Utility';
import Cart from '../Models/Cart';
import Product from '../Models/Product';

class CartController{

    static async moveToCart(req, res, next){

        const{item_id} = req.params;
        const {userId} = req;
        const {quantity} = req.body;

        try {
            let items
            const {name, price, _id, admin } = await Product.findById(item_id).exec();

            const getUserCart = await Cart.findOne({owner:userId}).exec();

            if(getUserCart){
                const {cartItems} = getUserCart;

                items = [...cartItems];
                items.push( {
                    productname: name,
                    price: parseFloat(price),
                    quantity: quantity,
                    productId: _id , 
                    itemTotal: parseFloat(price) * parseInt(quantity)
                } )

                const totalPrice = items.map( item => item.itemTotal ).reduce( (a,b) => a + b, 0 );

                getUserCart.cartItems = items;
                getUserCart.totalPrice = totalPrice;

                getUserCart.save().then( updateCart => {
                    return Utils.api_response( res, 201, 'New item added to cart', null, updateCart)
                }).catch( err => { 
                    return Utils.appError(err, next)
                })
            }else{
                const newCart = new Cart({
                    owner: userId,
                    admin: admin,
                    totalPrice: parseFloat(price) * parseInt(quantity),
                    cartItems:[
                        {
                            productname: name,
                            price: parseFloat(price),
                            quantity: quantity,
                            productId: item_id,
                            itemTotal: parseFloat(price) * parseInt(quantity)
                        }
                    ]

                }).save().then( savedCart => {
                    return Utils.api_response(res, 201, 'Item added to cart successfully', null, savedCart);
                }).catch( err => {
                    return Utils.appError(err, next);
                })
            }

        } catch (error) {
            return Utils.appError(error, next);
        }        
    }

    
    static async getCart(req, res, next){
       
        const {userId} = req;
        const {page} = parseInt(req.query);

        const PER_PAGE = 5;

        const PAGE_TRACK = !page ? 1 : page;

        const SKIPPER = (PER_PAGE - 1) * 5;

        try {

            const findCart = await Cart.findOne({owner: userId, orderStatus:'pending' }).exec();

            const response = !findCart ?'Empty Cart':findCart.cartItems.slice(SKIPPER, PAGE_TRACK * PER_PAGE);

            return Utils.api_response(res, 200, `Your carts on page ${PAGE_TRACK}`, null, response)
            
        } catch (error) {
            return Utils.appError(error,next)
        }

        
    }

    static async purchase(req, res, next){
        //Simulating purchase

        const {cardNumber, cvv, expiryDate, pin} = req.body;
        const {cart_id} = req.params;
        const CHARGED = true


        try {
            const charge_cart = await Cart.findById(cart_id).exec();

            if(CHARGED){
                 
                const charge_msg = `${cardNumber} charged`

                charge_cart.orderStatus = 'approved';
                const items = charge_cart.cartItems.map( item => item.productId )

                // items.map( item => {
                //     try {
                //         const getProducts = await Product.findById(item.productId).exec();

                //         getProducts.quantity -=  item.quantity;

                //         const update = await getProducts.save();
                //         return Utils.api_response(res, 200, 'Purchased', null, charge_msg );
                //     } catch (error) {
                //         return Utils.appError(error, next)
                //     }

                // })

            }
            
        } catch (error) {
            return Utils.appError(error, next)
        }
    }

    static async removeFromCart(req, res, next){
        const { product_id } = req.params;
        const {userId} = req;
        try {
            const userC = await Cart.findById(userId).exec();
            const items = [...userC.cartItems];
            const removeProduct = items.find( item => item.productId == product_id )

            const newCart = items.filter( remove => remove !== removeProduct )

            userC.cartItems = newCart;

            userC.save().then( deleted => {
                return Utils.api_response(res, 200, 'Product removed from cart');
            }).catch( err => {
                return Utils.appError(err, next)
            } )
            
        } catch (error) {
            return Utils.appError(error, next)
        }
    }

    static async getSoldDetails(req, res, next){
        const PAGE_SIZE = 10;
        const {userId} = req;

       
        const {page} = parseInt(req.query);

        const page_count = !page ? 1 : page
      
        const skipper = ( page_count - 1 ) * PAGE_SIZE;
        

        try {

            const carts  = await Cart.find({admin:userId}).skip(skipper).limit(PAGE_SIZE).select('totalPrice', 'cartItems').exec()

            if(carts.length == 0){
                return Utils.api_response(res, 404, 'You do not have any sold products yet 😔!!!')
            }else{
                return Utils.api_response(res, 200, 'list of your products', null, carts)
            }

        } catch (error) {
            return Utils.appError(error, next)
        }
    }

}

export default CartController