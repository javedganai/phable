var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var OrderSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Address'
    },

    order_date: {
        type: Date, 
        default: new Date()
    },

    items: {
        type: Array,
        default: null
    },
    sub_total: {
        type: Number,
        default: 0
    },
    status:{
        type:Number, // 1 for active , 2 for delivered , 3 for cancelled
        default:1
    }
   

});

module.exports = mongoose.model("Order", OrderSchema);