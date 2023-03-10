const express =  require('express');
const router = express.Router();
const {requireSignIn, adminMiddleware,uploadS3} = require("../common-middleware");
const {createProduct,getProductsBySlug,getProductDetailsById, deleteProductById, getProducts} = require('../controllers/productController')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate()+"-"+file.originalname)
    }
})
const upload = multer({storage})

router.post('/product/create',requireSignIn,adminMiddleware,uploadS3.array('productPicture'),createProduct)
router.get('/products/:slug',getProductsBySlug)
router.get('/product/:productId',getProductDetailsById)
router.delete('/product/deleteProductById',requireSignIn,adminMiddleware,deleteProductById)
router.post('/product/getProducts',requireSignIn,adminMiddleware,getProducts)
router.post('/picture/upload', uploadS3.array('productPicture'),(req,res)=>{
    res.status(201).json({message:'upload'})
})






module.exports = router;
