const express = require('express');
const app = express();
const router=express.Router();

app.use('/',router)

const getProducts=require('./getProducts')

router.get('/products',getProducts)

module.exports=router;