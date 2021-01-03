const Medicine = require('../models/medicine');
const bcrypt = require('bcryptjs');
const APIResponse = require('../helpers/api-response');
const Cart = require('../models/cart');
const Wishlist = require('../models/wishlist');
const Addrress = require('../models/address');
const Order = require('../models/orderDetails');
const { updateMany } = require('../models/medicine');

exports.getMedicines = async function (req, res) {
    try {
        let query  = {};
        if(req.query.search){
            query['$or'] =  [{ 'generic_name': { $regex:  req.query.search, $options: 'i'} },{ 'class': { $regex:  req.query.search, $options: 'i'}},{ 'description': { $regex:  req.query.search, $options: 'i'}}]
        }
        let medicines = await Medicine.find(query);
        APIResponse.default.successWithData(res, 'success', medicines);
    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}

exports.getProductDetail = async function (req, res) {
    try {
        let medicines = await Medicine.findOne({ _id: req.params._id });
        APIResponse.default.successWithData(res, 'success', medicines);
    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}

exports.getCartItems = async function (req, res) {
    try {
        let cartItems = await Cart.find({ user_id: req.params.user_id ,status:1}).populate({
            model: 'Medicine',
            path: 'product_id'
        });
        APIResponse.default.successWithData(res, 'success', cartItems);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}


exports.getOrderItems = async function (req, res) {
    try {
        let cartItems = await Cart.find({ user_id: req.params.user_id ,status:2}).populate({
            model: 'Medicine',
            path: 'product_id'
        });
        APIResponse.default.successWithData(res, 'success', cartItems);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}
exports.saveCartItem = async function (req, res) {
    try {
        let cartDoc = await Cart.findOne({ user_id: req.body.user_id, product_id: req.body.product_id });
        if (cartDoc) return APIResponse.default.fail(res, 'already in the cart')
        let cart = new Cart(req.body);
        let data = await cart.save();
        APIResponse.default.successWithData(res, 'success', data);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}
exports.getWishItems = async function (req, res) {
    try {
        let cartItems = await Wishlist.find({ user_id: req.params.user_id });
        APIResponse.default.successWithData(res, 'success', cartItems);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}
exports.getCartWishCount = async function (req, res) {
    try {
        let wishCount = await Wishlist.count({ user_id: req.params.user_id });
        let cartCount = await Cart.count({ user_id: req.params.user_id });
        APIResponse.default.successWithData(res, 'success', { wishCount: wishCount, cartCount: cartCount });

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}
exports.deleteCartItem = async function (req, res) {
    try {
        let cartCount = await Cart.deleteOne({ _id: req.params._id });
        APIResponse.default.successWithData(res, 'success', {});

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}

exports.saveWishItem = async function (req, res) {
    try {
        let wish = new Wishlist(req.body);
        let data = await wish.save();
        APIResponse.default.successWithData(res, 'success', data);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}

exports.updateCart = async function (req, res) {
    try {
        req.body.forEach(async (element) => {
            await Cart.updateOne({ _id: element._id }, { $set: { quantity: element.quantity } }, { new: true });
        });
        APIResponse.default.successWithData(res, 'success', true);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}
exports.placeOrder = async function (req, res) {
    try {
        let address = new Addrress(req.body.address);
        await address.save();//save the address of the order
        let cartIds = [];
        req.body.cartDetails.forEach(async (element) => {
            cartIds.push(element._id);

        });
        let order = new Order({
            user_id: req.body.user_id,
            address_id: address._id,
            order_date: new Date(),
            items: cartIds,
            sub_total: req.body.subTotal
        });
        await order.save();
        //update the cart as well
        await Cart.updateMany({ _id: { $in: cartIds } }, { $set: { status: 2 } }); // update the cart status
        APIResponse.default.successWithData(res, 'success', true);

    } catch (err) {

        APIResponse.default.fail(res, err)

    }
}