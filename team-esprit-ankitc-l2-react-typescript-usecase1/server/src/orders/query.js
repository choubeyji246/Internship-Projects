const _getOrdersQuery = `
SELECT 
    o.id AS order_id,
    o.date AS order_date,
    c.Customer_name AS customer_name,
    o.payment_status,
    o.total,
    o.delivery,
    o.items,
    o.fulfilment,
    o.product_id
FROM 
    orders o
JOIN 
    customer c ON o.customer_id = c.id
WHERE 
    (? IS NULL OR o.payment_status = ?)
    AND (? IS NULL OR o.fulfilment = ?)
    AND (? IS NULL OR o.date BETWEEN ? AND ?)
LIMIT ? OFFSET ?;
`;


const _updateOrderQuery=`
Update 
    orders set ?? = ? 
where id = ?;
`

const _getOrderDetailsQuery=`
SELECT
    c.Customer_name,
    c.Address,
    c.Mob_no,
    o.id AS order_id,
    o.date,
    o.customer_id,
    o.payment_status,
    o.total,
    o.delivery,
    o.items,
    o.fulfilment,
    p.product_name,
    p.price
FROM
    customer c
JOIN
    orders o ON c.id = o.customer_id
JOIN
    products p ON p.id = o.product_id
WHERE
    o.id = ?;
`



module.exports = {
    _getOrdersQuery,_updateOrderQuery,_getOrderDetailsQuery
};
