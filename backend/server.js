import express from 'express';
import data from './data.js';
import config from './config.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from'./routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const mongodbUrl="mongodb+srv://"+ process.env.DB_USER_PASS + "@cluster0.zzvci.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(()=>console.log("mongodb connected")).catch(error=>console.log(error))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
 
const app=express();

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.use('/api/users',userRoute)


app.use('/api/products',productRoute)


    
app.listen(5000,()=>{
    console.log("server started at http:/localhost:5000")
})