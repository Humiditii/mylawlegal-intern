import {Schema, model} from 'mongoose';

const cartSchema = new Schema({
    orderDate:{
        type: String,
        required: true,
        default: Date.now()
    },
    orderStatus: {
        type: String,
        default: 'pending'
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'auth'
    },
    admin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'auth'
    },
    totalPrice: {
        required: true,
        type: Number
    },
    cartItems: [
        {
            productname: {
                type: String,
                required: true
            }, 
            price: {
                required: true,
                type: Number
            },
            quantity: {
                required: true, 
                type: Number
            },
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            }, 
            itemTotal: {
                type: Number, 
                required: true
            }
        }
    ]
})

export default model('cart', cartSchema);