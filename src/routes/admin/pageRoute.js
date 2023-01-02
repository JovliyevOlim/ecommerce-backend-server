const express = require('express');
const {upload, requireSignIn, adminMiddleware} = require("../../common-middleware");
const {createPage, getPage} = require("../../controllers/adminController/pageController");
const router = express.Router();


router.post('/page/create',requireSignIn,adminMiddleware, upload.fields([
    {name:'banners'},
    {name:'products'}
]),createPage)

router.get('/page/:category/:type',getPage)


module.exports = router
