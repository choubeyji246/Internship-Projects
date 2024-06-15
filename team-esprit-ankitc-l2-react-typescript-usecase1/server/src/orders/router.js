const express = require('express');
const { getOrders, updateOrder, getOrderDetails } = require('./controller');
const app = express();
const router=express.Router();

app.use('/',router);

router.get('/getorders',getOrders)
router.patch('/updateorder',updateOrder)
router.get('/getorderdetails',getOrderDetails)

module.exports=router;