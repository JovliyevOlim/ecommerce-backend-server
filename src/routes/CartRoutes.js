const express =  require('express');
const router = express.Router();
const {addItemToCart,getCartItems, removeCartItems} = require('../controllers/CartControllers')
const {requireSignIn, userMiddleware} = require("../common-middleware");

router.post('/user/cart/addtocart',requireSignIn,userMiddleware, addItemToCart)
router.post('/user/getCartItems',requireSignIn,userMiddleware,getCartItems)
router.post("/user/cart/removeItem",requireSignIn,userMiddleware,removeCartItems)



module.exports = router;
