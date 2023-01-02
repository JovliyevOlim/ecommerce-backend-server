const express = require('express');
const router = express.Router();
const User = require("../models/userModel")
const {signup, signin} = require('../controllers/AuthController')
const {isRequestValidated, validateSignupRequest, validateSigninRequest} = require('../validators/authValidator')

router.post('/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/signin', validateSigninRequest, isRequestValidated, signin)




module.exports = router
