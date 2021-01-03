var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
var medicineController = require('../controllers/general');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup',userController.saveUserDetail);
router.post('/login',userController.loginUser);


router.get('/medicines',medicineController.getMedicines);

router.get('/product-detail/:_id',medicineController.getProductDetail);


router.get('/cart/:user_id',medicineController.getCartItems);
router.get('/wishlist',medicineController.getWishItems);

router.get('/cart-wishtlist-count/:user_id',medicineController.getCartWishCount)
router.delete('/cart/:_id',medicineController.deleteCartItem)
router.post('/save-cart',medicineController.saveCartItem);
router.put('/update-cart',medicineController.updateCart);
router.post('/save-wishlist',medicineController.saveWishItem)
router.post('/order-details',medicineController.placeOrder);
router.get('/order-details/:user_id',medicineController.getOrderItems);



module.exports = router;
