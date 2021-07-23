import express from 'express';
import data from './data.js';
import config from './config.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from'./routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import bodyParser from 'body-parser';


dotenv.config();
const mongodbUrl="mongodb+srv://FrancoisDb:merndb04@cluster0.zzvci.mongodb.net/database?retryWrites=true&w=majority";
//const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>console.log("mongodb connected")).catch(error=>console.log(error))



const app=express();

app.use(bodyParser.json())

app.use('/api/users',userRoute)


/*
app.use("/api/products",productRoute)*/
app.get('/api/products', (req,res) =>{
res.send(data.products);
console.log("products..")

})

app.get('/api/products/:id', (req,res) =>{
    const productId=req.params.id
    const product=data.products.find(x=>x._id===productId)
    if(product){
    res.send(product);
    }
    else{
    res.status(404).send({msg:"Product not found.."})
    }
    console.log("productId..")
    
    })
    
app.listen(5000,()=>{
    console.log("server started at http:/localhost:5000")
})