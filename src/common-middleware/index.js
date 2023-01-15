const jwt = require("jsonwebtoken");
const multer = require('multer');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
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

const s3 = new aws.S3({
    credentials:{
        accessKeyId:'AKIAQMKRKFI64MGGSPPT',
        secretAccessKey:'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'
    },
})

const uploadS3 = multer(
    {
    storage: multerS3({
        s3: s3,
        bucket: 'shopping-cart-shop',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        metadata: function (req, file, cb) {
            console.log(file)
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            console.log(file)
            cb(null, shortid.generate()+"-"+file.originalname)
        }
    })
});

const requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user
    } else {
        return res.status(400).json({message: 'Authorization required'})
    }
    next();


}

const userMiddleware = (req, res, next) => {

    if (req.user.role !== 'user') {
        return res.status(400).json({message: 'User access denied'})
    }
    next();
}

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({message: 'Admin access denied'})
    }
    next();
}


module.exports = {
    requireSignIn,
    adminMiddleware,
    userMiddleware,
    upload,
    uploadS3
}
