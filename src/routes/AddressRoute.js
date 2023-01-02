const express = require('express')
const router = express.Router();
const {requireSignIn,userMiddleware}  = require('../common-middleware')
const {getAddress,addAddress} = require('../controllers/AddressController')


router.post('/user/address/create',requireSignIn,userMiddleware,addAddress)
router.post('/user/getaddress',requireSignIn,userMiddleware,getAddress)


module.exports = router
