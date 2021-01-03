var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var Wishlist
 = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Medicine'

    }
    ,
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    ,
    quantity: {
        type:Number,
        default:1
    }
});

module.exports = mongoose.model("Wishlist", Wishlist);