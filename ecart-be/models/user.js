var mongoose = require('mongoose');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post

var User = new Schema({
    name:{
        type:String
    },
    email: {
      type: String
    }
    ,
    password: {
        type: String
    }
});

module.exports = mongoose.model("User", User);