import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './app/Routes/AuthRoutes';
import productRoute from './app/Routes/ProductRoutes'; 
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
    extended: false
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
 *      description: sign up new user either as an admin or a normal user
 *      parameters:
 *      - name: firstname
 *        description: First name of the user
 *        in: formData
 *        required: true
 *        type: String
 *      - name: lastname
 *        description: Last name of the user
 *        in: formData
 *        required: true
 *        type: String
 *      - name: email
 *        description: A valid email address
 *        in: formData
 *        required: true
 *        type: String
 *      - name: role
 *        description: Role of the account user, default value is User if nothing is passed
 *        in: formData
 *        type: String
 *      - name: street
 *        description: Streed adress of the residence
 *        in: formData
 *        required: true
 *        type: String
 *      - name: state
 *        description: State of residence
 *        in: formData
 *        required: true
 *        type: String
 *      - name: localgovt 
 *        description: localgovt of residence
 *        in: formData
 *        required: true
 *        type: String
 *      - name: phone
 *        description: Mobile phone number
 *        in: formData
 *        required: true
 *        type: Number
 *      - name: password
 *        description: Account password
 *        in: formData
 *        required: true
 *        type: String
 *      responses:
 *          201:
 *              description: Success
 */
/**
 * @swagger
 * /api/v1/auth/signin:
 *  post:
 *      description: sign up new
 *      responses:
 *          201:
 *              description: Success
 */
app.use('/api/v1/', authRoute);
app.use('/api/v1/',productRoute);

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
    // console.log(error);
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