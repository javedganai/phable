var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var Cart = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Medicine'

    }
    ,
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    ,
    quantity: {
       type: Number,
       default:1
    },
    status:{
        type:Number, // 1 for active , 2 for ordered 
        default:1
    }
});

module.exports = mongoose.model("Cart", Cart);