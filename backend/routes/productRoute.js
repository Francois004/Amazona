import express from 'express';
import productModel from '../models/productModel.js';
import getToken from '../util.js';

const router=express.Router();


// get all products
router.get("/",async (req,res)=>{
 const products=await productModel.find({});
 res.send(products)
})

//add product
router.post("/",async (req,res)=>{
    const product=new productModel({
      name:req.body.name,
      price:req.body.price,
      image:req.body.image,
      brand:req.body.brand,
      category:req.body.category,
      countInStock:req.body.countInStock,
      description:req.body.description,
      numReviews:req.body.numReviews,

    })
    const newProduct=await product.save();
    if(newProduct){
    return    res.status(201).send({
            message:'New product Created',
            data:newProduct
        })
    }
    return res.status(500).send({message:'Error in creating Product'})
})

// product details

router.get('/:id', async (req,res) =>{
    const productId=req.params.id
    const product=await productModel.findById(productId)
    //data.products.find(x=>x._id===productId)
    try{
    if(product){
    res.send(product);
    }
    else{
        console.log("productId..", productId)
     res.status(404).send({msg:"Product not found.."})
    }
   
}
catch(err){
    console.log(err)
}

    
    })


// update product

router.put("/:id",async (req,res)=>{
    const productId=req.params.id
    const product=await productModel.findOne({_id:productId})
 if(product){
    product.name=req.body.name;
    product.price=req.body.price;
    product.image=req.body.image;
    product.brand=req.body.brand;
    product.category=req.body.category;
    product.countInStock=req.body.countInStock;
    product.description=req.body.description;
    product.numReviews=req.body.numReviews;

 }
   
    const UpdtProduct=await product.save();
    if(UpdtProduct){
    return    res.status(201).send({
            message:' product updated',
            data:UpdtProduct
        })
    }
    return res.status(500).send({message:'Error updating Product'})
})

//delete product

router.delete("/:id",async (req,res)=>{
 const deletedProduct= await productModel.findById(req.params.id);
 if(deletedProduct){
     await deletedProduct.remove();
     res.send({messsage:"Product deleted"})
 }
 else{
    res.send("Error in Deletion.")
 }
 
})
export default router;