const express = require('express');
const router = express.Router();
const {initialData} =  require('../../controllers/adminController/initialDataController')
const {requireSignIn, adminMiddleware} = require("../../common-middleware");

router.post('/initialdata',requireSignIn,adminMiddleware, initialData)


module.exports = router
