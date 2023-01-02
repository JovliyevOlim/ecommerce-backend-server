const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Address = require('../models/addressModal')

const addOrder = (req,res)=>{
    Cart.deleteOne({user:req.user._id})
        .exec((error,result)=>{
            if (error) return res.status(400).json({error});
            if (result){
                req.body.user = req.user._id;
                req.body.orderStatus =[
                    {
                        type:"ordered",
                        date:new Date(),
                        isCompleted:true
                    },
                    {
                        type:"packed",
                        isCompleted: false
                    },
                    {
                        type:"shipped",
                        isCompleted: false
                    },
                    {
                        type:"delivered",
                        isCompleted: false
                    }
                ]
                const order = new Order(req.body);
                order.save((error ,order)=>{
                    if (error) return res.status(400).json({error});
                    if (order){
                        return   res.status(201).json({order});
                    }
                });
            }
        })

};

const getOrders = (req,res) => {
    Order.find({user:req.user._id})
        .select("_id paymentStatus items")
        .populate("items.productId","_id name productPictures")
        .exec((error,orders)=>{
            if (error) return res.status(400).json({error});
            if (orders){
                return res.status(200).json({orders});
            }
        });
};


const getOrder = (req,res)=>{
    Order.findOne({_id:req.body._id})
        .populate('items.productId',"_id name productPictures")
        .lean()
        .exec((error,order)=>{
            if (error) return res.status(400).json({error})
            if (order) {
                Address.findOne({
                    user:req.user._id,
                }).exec((error,address)=>{
                    if (error) return res.status(400).json({error});
                    order.address = address.address.find(
                        (adr)=>adr._id.toString() == order.addressId.toString()
                    );
                    return  res.status(200).json({
                        order,
                    })
                })
            }
        })
}


module.exports ={
    addOrder,
    getOrders,
    getOrder
}
