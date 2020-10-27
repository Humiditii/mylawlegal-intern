import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './app/Routes/AuthRoutes';
import productRoute from './app/Routes/ProductRoutes'; 
import cartRoutes from './app/Routes/CartRoutes';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

dotenv.config();

const app = express();

const swaggerOptions = {
    swaggerDefinition:{
        info: {
            title: 'Mylawlegal E-commerce API',
            version: '1.0.0'
        }
    },
    apis:['app.js'],
};

// Connection object which contains the constant for the port and the database
let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_ATLAS
}


process.env.NODE_ENV == 'development' ? ( connection_config.port = 3333 , connection_config.database_url = process.env.DATABASE_URL ): null


app.use(bodyParser.urlencoded({
    extended: true
}));

// application/json parsing json incoming request

app.use(bodyParser.json());

//allowing CORS
app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))



//Application routes


/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *      summary: sign up new user either as an admin or a normal
 *      parameters:
 *      - in: formData
 *        name: firstname
 *        required: true
 *        description: User first name
 *        schema:
 *          type: String
 *      - in: formData
 *        name: lastname
 *        required: true
 *        description: User first lastname
 *        schema:
 *          type: String
 *      - in: formData
 *        name: email
 *        required: true
 *        description: User email
 *        schema:
 *          type: String
 *      - in: formData
 *        name: role
 *        description: account role, default is User if nothing is passed
 *        schema:
 *          type: String
 *      - in: formData
 *        name: street
 *        required: true
 *        description: Residence street
 *        schema:
 *          type: String
 *      - in: formData
 *        name: state
 *        required: true
 *        description: Residence state
 *        schema:
 *          type: String
 *      - in: formData
 *        name: localgovt
 *        required: true
 *        description: Residence localgovernment
 *        schema:
 *          type: String
 *      - in: formData
 *        name: phone
 *        required: true
 *        description: User phone
 *        schema:
 *          type: integer
 *      - in: formData
 *        name: password
 *        required: true
 *        description: Account password
 *        schema:
 *          type: String
 *      responses:
 *          201:
 *              description: Success
 */
    
/**
 * @swagger
 * /api/v1/auth/signin:
 *  post:
 *      summary: Authorize a user with correct details
 *      parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        description: User email
 *        schema:
 *          type: String
 *      
 *      - in: formData
 *        name: password
 *        required: true
 *        description: Account password
 *        schema:
 *          type: String
 *      responses:
 *          200:
 *              description: Success
 */
/**
 * @swagger
 * /api/v1/cart/my_cart:
 *  get:
 *      summary: Get the list of items in a user's cart, for authorized user
 *      parameters:
 *      - in: query
 *        name: page
 *        description: page number
 *        schema:
 *          type: integer
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 * 
 *      responses:
 *          200:
 *              description: Cart lists
 */

/**
 * @swagger
 * /api/v1/cart/move_to_cart/{item_id}:
 *  post:
 *      summary: Select a product from store and add it to your cart
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 *      - in: formData
 *        name: item_id
 *        required: true
 *        description: Item id
 *        schema:
 *          type: String
 * 
 *      responses:
 *          201:
 *              description: Success
 */

/**
* @swagger
* /api/v1/cart/purchase:
*  post:
*      summary: Simulating payment to purchase, though 3rd party library to be used like Paystack,paypal or stripe not used
*      parameters:
*      - in: header
*        name: Authorization
*        required: true
*        description: An authorization jwt token
*        schema:
*          type: String
*      - in: path
*        name: cardNumber
*        required: true
*        description: Card number
*        schema:
*          type: integer
*      - in: path
*        name: ccv
*        required: true
*        description: ccv
*        schema:
*          type: integer
*      - in: path
*        name: expiryDate
*        required: true
*        description: Expiry date
*        schema:
*          type: integer
*      - in: path
*        name: pin
*        required: true
*        description: card pin
*        schema:
*          type: integer
*      responses:
*          201:
*              description: Success
*/

/**
 * @swagger
 * /api/v1/cart/purchase/details:
 *  get:
 *      summary: Get the details of sold goods (Administrator access only)
 *      parameters:
 *      - in: query
 *        name: page
 *        description: page number
 *        schema:
 *          type: integer
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 * 
 *      responses:
 *          200:
 *              description: Sold details
 */
/**
 * @swagger
 * /api/v1/cart/delete/{product_id}:
 *  delete:
 *      summary: Delete item from cart
 *      parameters:
 *      - in: path
 *        name: product_id
 *        required: true
 *        description: product id
 *        schema:
 *          type: String
 * 
 *      responses:
 *          201:
 *              description: Success
 */

 /**
* @swagger
* /api/v1/product/add-product:
*  post:
*      summary: Admins add new product to ther store and the categories which they belong (Administrative access only) 
*      parameters:
*      - in: formData
*        name: productName
*        required: true
*        description: Name of the product to be added
*        schema:
*          type: String
*      - in: header
*        name: Authorization
*        required: true
*        description: An authorization jwt token
*        schema:
*          type: String
*      - in: formData
*        name: productPrice
*        required: true
*        description: Unit price of the product
*        schema:
*          type: integer
*      - in: formData
*        name: productQuantity
*        required: true
*        description: Quantity of the product being added
*        schema:
*          type: integer
*      - in: formData
*        name: description
*        required: true
*        description: Product description
*        schema:
*          type: String
*      - in: formData
*        name: category
*        required: true
*        description: Product category
*        schema:
*          type: String
*      responses:
*          201:
*              description: Success
*/

/**
 * @swagger
 * /api/v1/product/edit-product/{product_id}:
 *  patch:
 *      summary: Edit a product, default values are returned from the front-end to the form, so the required field could be changed (Administrative access only)
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 *      - in: path
 *        name: product_id
 *        required: true
 *        description: Product id
 *        schema:
 *          type: String
 *      - in: formData
*        name: productName
*        required: true
*        description: Name of the product to be added
*        schema:
*          type: String
*      - in: header
*        name: Authorization
*        required: true
*        description: An authorization jwt token
*        schema:
*          type: String
*      - in: formData
*        name: productPrice
*        required: true
*        description: Unit price of the product
*        schema:
*          type: integer
*      - in: formData
*        name: productQuantity
*        required: true
*        description: Quantity of the product being added
*        schema:
*          type: integer
*      - in: formData
*        name: description
*        required: true
*        description: Product description
*        schema:
*          type: String
*      - in: formData
*        name: category
*        required: true
*        description: Product category
*        schema:
*          type: String
 * 
 *      responses:
 *          200:
 *              description: Cart lists
 */

/**
 * @swagger
 * /api/v1/product/categories:
 *  get:
 *      summary: Get all categories of product available
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 * 
 *      responses:
 *          200:
 *              description: Sold details
 */

 /**
 * @swagger
 * /api/v1/product/products:
 *  get:
 *      summary: Get all products (paginated)
 *      parameters:
 *      - in: query
 *        name: page
 *        description: page number
 *        schema:
 *          type: integer
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 *      - in: formData
*        name: category
*        description: Product category
*        schema:
*          type: String
 * 
 *      responses:
 *          200:
 *              description: Sold details
 */

 /**
 * @swagger
 * /api/v1/product/delete/{product_id}:
 *  delete:
 *      summary: Delete a product (Administrative access required)
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        description: An authorization jwt token
 *        schema:
 *          type: String
 *      - in: path
 *        name: product_id
 *        required: true
 *        description: product id
 *        schema:
 *          type: String
 * 
 *      responses:
 *          201:
 *              description: Success
 */
 
 

app.use('/api/v1/', authRoute);
app.use('/api/v1/',productRoute);
app.use('/api/v1/', cartRoutes);

//routes ends here
app.use('/', (req, res)=> {
    //console.log(req.body)
    res.status(200).json({
        statusCode: 200,
        message: 'Welcome to the entry point to the api'
    })
} )


app.all( '*',(req, res, next)=> {
    return res.status(404).json({
        statusCode: 404,
        message: 'Not found, invalid route'
    });
})


//Handling errors 
app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        statusCode: status
    });
});




mongoose.connect( connection_config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then( connection => {
    app.listen(connection_config.port, () => {
        console.log('Server running at ' + connection_config.port);
    });
}).catch( err => {
    throw err;
})