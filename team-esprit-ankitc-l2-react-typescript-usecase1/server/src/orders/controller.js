const executeQuery = require('../utils/db');
const {_getOrdersQuery, _updateOrderQuery, _getOrderDetailsQuery}= require("./query")
const { AppError } = require('../utils/errorHandler');
const {successMessageFunction} = require('../utils/successResponse');

let responseObject = {
    message: "",
    data: null
};

const getOrders = async(req,res,next)=>{
    try {
        const {paymentStatus, fulfilment, startDate,endDate, page}= req.query

        offset = (page-1) * 10;
        //console.log(paymentStatus,fulfilment);
        values=[paymentStatus,paymentStatus ,fulfilment,fulfilment, endDate, startDate, endDate, 12, offset]
       const result= await executeQuery(_getOrdersQuery, values);
       //console.log(result);
       responseObject = { message: "Data fetched succesfully", data:result };
       res.status(200).send(successMessageFunction(200, responseObject));
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            next(error);
        } else {
            const customError = new AppError(400, error.message);
            next(customError);
        }
    }
     
}

const updateOrder =async (req,res,next)=>{
    try {
        const {orderId } = req.query;
        const { columnName, columnValue} = req.body; 

        const result = await executeQuery(_updateOrderQuery, [columnName, columnValue, orderId]);
    
        const responseObject = { message: "Order updated successfully", data: result };
        res.status(200).send(successMessageFunction(200, responseObject));
        
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            next(error);
        } else {
            const customError = new AppError(400, error.message);
            next(customError);
        }
    }
}

const getOrderDetails = async(req, res, next) => {
    const {orderId} = req.query;
    try {
        const result = await executeQuery(_getOrderDetailsQuery, [orderId])
        responseObject = { message: "Data fetched succesfully", data:result };
        res.status(200).send(successMessageFunction(200, responseObject));
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            next(error);
        } else {
            const customError = new AppError(400, error.message);
            next(customError);
        }
    }
}
module.exports={getOrders,updateOrder,getOrderDetails}