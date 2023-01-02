const Category = require('../../models/categoryModel')
const Product = require('../../models/ProductModel')
const Order = require('../../models/orderModel')

function createCategories(categories,parentId = null){

    const categoryList = [];
    let category;
    if (parentId == null){
        category =  categories.filter(cat=>cat.parentId == undefined)
    }else{
        category = categories.filter(cat=>cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name: cate.name,
            slug:cate.slug,
            type:cate.type,
            parentId:cate.parentId,
            children:createCategories(categories,cate._id)
        })
    }

    return categoryList;

}


const  initialData = async  (req,res)=>{

    const categories = await Category.find({}).exec();
    const products=  await  Product.find({})
        .select('_id name category price quantity slug description productPictures')
        .populate({path:'category',select:'_id name type'})
        .exec();
    const orders = await Order.find({})
        .populate("items.productId","name")
        .exec()
    res.status(200).json({
        categories:createCategories(categories),
        products,
        orders
    })
}


module.exports = {
    initialData
}
