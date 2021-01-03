







var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var AddressSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
    ,
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: null
    },
    company_name: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    house_no: {
        type: String,
        default: null
    },
    apartment: {
        type: String,
        default: null
    },
    town: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    post_code: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    order_notes: {
        type: String,
        default: null
    },

});

module.exports = mongoose.model("Address", AddressSchema);