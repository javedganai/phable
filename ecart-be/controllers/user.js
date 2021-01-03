const User = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const APIResponse = require('../helpers/api-response');

exports.saveUserDetail = async function (req, res) {
  console.log('the ema',req.body.email)
    let user = new User({
      email:req.body.email,
    password:req.body.password
  });
    let salt  = bcrypt.genSaltSync(10);

    user.password = await bcrypt.hash(user.password, salt);
    console.log('the ise is',user)
    user.save()
        .then(item => {
            res.json({
                success: true,
                message: item
            })
        })
};

exports.loginUser = async function(req,res){
  
  try{
    let user = await User.findOne({email:req.body.email});
    if (!user) return APIResponse.default.forbidden(res, "Invalid Email.");

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return APIResponse.default.forbidden(res, "Incorrect  password.");
    //after successfull login
    let plainObject = {
      name:user.email
    }
    let userObject = Object.assign(plainObject, {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // expire in 1 hour
    });
    if (process.env.ENV == "development") {
      userObject.exp = userObject.exp * 24 * 7
    }
    var token = jwt.sign(userObject, 'secrectkey');
    user["token"] = token;
    res.setHeader("auth-token", token);
    APIResponse.default.successWithData(res,'sucecss',user);
  } catch (error) {
    APIResponse.default.fail(res, error);
  }

}