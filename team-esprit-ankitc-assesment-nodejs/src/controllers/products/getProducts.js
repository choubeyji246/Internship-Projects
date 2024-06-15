const executeQuery = require('../../utils/db');
const response = require('../../utils/successResponse');
const errResponse = require('../../utils/errorResponse');

const getAllProductsQuery = `
    SELECT 
        product_id,
        product_name,
        product_model,
        product_avaibility,
        product_ratings,
        product_type,
        product_price
    FROM
        Products
`;

const getAllProducts = async (req, res) => {
    try {
        const finalQuery = await buildQuery(req);
        const result = await executeQuery(finalQuery);

        const responseObject = {
            message: "Data Fetched",
            data: result
        };

        res.send(response(200, responseObject));
    } catch (error) {
        // console.error('Error in fetching products:', error.message);
        res.send(errResponse(500, 'Error while fetching details'));
    }
};

const buildQuery = async (req) => {
    const { page, limit, sort, rating, type, price, name } = req.query;

    let filterConditions = [];
    let sortCondition = "";

    // Filter conditions
    if (rating) {
        filterConditions.push(`product_ratings ${rating}`);
    }

    if (type) {
        filterConditions.push(`product_type = '${type}'`);
    }

    if (price) {
        filterConditions.push(`product_price ${price}`);
    }

    if (name) {
        filterConditions.push(`product_name LIKE '%${name}%'`);
    }

    if (sort) {
        sortCondition = `ORDER BY ${sort}`;
    }

    const offset = (page - 1) * limit;
    const paginationCondition = `LIMIT ${limit} OFFSET ${offset}`;

    const finalQuery = `
        ${getAllProductsQuery}
        ${filterConditions.length > 0 ? `WHERE ${filterConditions.join(' AND ')}` : ''}
        ${sortCondition}
        ${paginationCondition};
    `;
    console.log(finalQuery);
    return finalQuery;
};

module.exports = getAllProducts;
