const executeQuery = require('../../utils/db');
const jwt = require('jsonwebtoken');
const errResponse = require('../../utils/errorResponse');
const response = require('../../utils/successResponse');

const productFields = {
    product_name: 'p.product_name',
    product_model: 'p.product_model',
    product_availability: 'p.product_avaibility',
    product_ratings: 'p.product_ratings',
    product_type: 'p.product_type'
};

const customerFields = {
    customer_name: 'c.customer_name',
    customer_contact: 'c.customer_contact',
    customer_gender: 'c.customer_gender',
    customer_address: 'c.customer_address'
};

const getAllDetails = `
    SELECT 
        ${Object.values(customerFields)},
        ${Object.values(productFields)}
    FROM
        Customers c
            JOIN
        Customer_orders co ON c.customer_email = co.email
            JOIN
        Products p ON p.product_id = co.ProductId
    WHERE
        co.email = ?;
`;

const getCustomerOrder = async (req, res) => {
    const fieldArray = req.query.fields ? req.query.fields.split(',') : [];

    const selectedFields = fieldArray.map(field => {
        if (productFields.hasOwnProperty(field)) {
            return productFields[field];
        } else if (customerFields.hasOwnProperty(field)) {
            return customerFields[field];
        }
    });

    const getCustomerOrderQuery = `
    SELECT 
        ${selectedFields.join(', ')}
    FROM
        Customers c
            JOIN
        Customer_orders co ON c.customer_email = co.email
            JOIN
        Products p ON p.product_id = co.ProductId
    WHERE
        co.email = ?;
    `;

    const token = req.header('Authorization');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const values = [email];

        let result;

        if (selectedFields.length > 0) {
            result = await executeQuery(getCustomerOrderQuery, values);
        } else {
            result = await executeQuery(getAllDetails, values);
        }

        const responseObject = {
            message: "Data Fetched",
            Data: result
        };

        res.send(response(200, responseObject));
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.send(errResponse(403, 'Invalid Token'));
        } else {
            console.log(error);
            res.send(errResponse(400, 'Error while fetching details'));
        }
    }
};

module.exports = getCustomerOrder;
