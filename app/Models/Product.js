import { Schema, model} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    description: {
        type:String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    admin : {
        required: true,
        type:Schema.Types.ObjectId,
        ref: 'auth'
    },
    updated: {
        type: Date,
        default: Date.now()
      }

    
})


export default model('product', productSchema);
