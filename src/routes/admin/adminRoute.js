const express = require('express');
const router = express.Router();
const {signup, signin,signout} = require('../../controllers/adminController/adminController')
const {validateSignupRequest, isRequestValidated, validateSigninRequest} = require('../../validators/authValidator')
const {requireSignIn} = require("../../common-middleware");

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin', validateSigninRequest, isRequestValidated,  signin)
router.post('/admin/signout',requireSignIn,signout)


module.exports = router
