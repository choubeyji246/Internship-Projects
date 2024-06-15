const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../config/.env') });
const express=require('express')
const app=express()

const customer=require('./controllers/customer/customerRouter')
const products=require('./controllers/products/productRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/customer',customer)
app.use('/prod',products)

app.listen(3000,(err)=>{
    if(!err) 
        console.log("Server is running on port 3000")
    else
        throw err;
})

app.get('/',(req,res)=>{
    res.sendFile('server running')
})