const express = require('express');
const app = express();
const router=express.Router();

const validateUserLoginSchema=require('../../utils/validation')

const loginController=require('./loginCustomer')
const getOrderDataController=require('./getCustomerOrder')

app.use('/',router)

router.post('/login',validateUserLoginSchema,loginController)
router.get('/customerorder',getOrderDataController)

module.exports=router;