const Product = require('../models/ProductModel')
const shortid = require('shortid')
const slugify = require("slugify");
const Category = require('../models/categoryModel')

const createProduct = (req, res) => {
    const {name, price, description, category, quantity} = req.body

    let productPictures = [];

    if (req.files?.length > 0) {
        productPictures = req.files.map(file => {
            return {img: file.location}
        })
    }

    console.log(productPictures)

    const product = new Product({
        name: name,
        slug: slugify(name), quantity,
        price, productPictures, description, category, createdBy: req.user._id
    })

    product.save(((error, product) => {
        if (error) return res.status(400).json({error});
        if (product) {
            res.status(201).json({product,files:req.files})
        }
    }))
}

const getProductsBySlug = (req, res) => {
    const {slug} = req.params;
    Category.findOne({slug: slug})
        .select('_id type')
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({error})
            }

            if (category) {
                Product.find({category: category._id})
                    .exec((error, products) => {
                        if (error) {
                            return res.status(400).json({error});
                        }
                        if (category.type){
                            if (products.length > 0) {
                                res.status(200).json({
                                    products,
                                    priceRange:{
                                        under5k:  5000000,
                                        under10k: 10000000,
                                        under15k: 15000000,
                                        under20k: 20000000,
                                        under30k: 30000000
                                    },
                                    productsByPrice: {
                                        under5k: products.filter(product => product?.price <= 5000000),
                                        under10k: products.filter(product => product?.price > 5000000 && product?.price <= 10000000),
                                        under15k: products.filter(product => product?.price > 10000000 && product?.price <=15000000),
                                        under20k: products.filter(product => product?.price > 15000000 && product?.price <=20000000),
                                        under30k: products.filter(product => product?.price > 20000000 && product?.price <=30000000)
                                    }
                                })
                            }

                        }
                        else{
                            res.status(200).json({products})
                        }
                    })
            }
        });
}

const getProductDetailsById = (req, res) => {
    const {productId} = req.params;
    if (productId) {
        Product.findOne({_id: productId})
            .exec((error, product) => {
                if (error) return res.status(400).json({error})
                if (product) {
                    console.log(product)
                    return res.status(200).json({product})
                }

            })
    } else {
        return res.status(400).json({error: 'Params required'})
    }
}

const deleteProductById = (req,res)=>{
    const {productId} = req.body.payload;
    if(productId){
        Product.deleteOne({_id:productId})
            .exec((error,result)=>{
                if (error) return res.status(400).json({error});
                if (result){
                    return  res.status(202).json({result})
                }
            })
    }else {
        return res.status(400).json({error:'Params required'})
    }

 }

 const getProducts = async (req,res)=>{
    const products  =await Product.find({})
        .select("_id name price quantity slug description productPictures category")
        .populate({path:'category',select:"_id name"})
        .exec()

     return res.status(200).json({products})
 }


module.exports = {
    createProduct,
    getProductsBySlug,
    getProductDetailsById,
    getProducts,
    deleteProductById
}
