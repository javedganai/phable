var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var MedicineSchema = new Schema({
    class: {
        type: String,
        default: true

    },
    
    description: {
        type: String
    }
    ,
    generic_name: {
        type: String
    },
    
    image_url:{
        type:String
    }
    ,
    strength: {
        String
    }
    ,
    dosage: {
        type: String
    },

    rating: {
        type: Number
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("Medicine", MedicineSchema);