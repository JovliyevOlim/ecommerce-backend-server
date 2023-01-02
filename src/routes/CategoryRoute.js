const express =  require('express');
const router = express.Router();
const {addCategory, getCategory, updateCategory,deleteCategories} = require('../controllers/CategoryController')
const {requireSignIn, adminMiddleware} = require("../common-middleware");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

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

router.post('/category/create',requireSignIn, adminMiddleware ,upload.single('categoryImage'),addCategory)
router.get('/category/getcategory',getCategory)
router.put('/category/update',upload.array('categoryImage'),updateCategory)
router.post('/category/delete',deleteCategories)




module.exports = router;
