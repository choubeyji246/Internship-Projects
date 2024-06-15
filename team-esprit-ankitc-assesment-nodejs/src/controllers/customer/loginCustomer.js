const executeQuery = require('../../utils/db');
const response = require('../../utils/successResponse');
const errResponse = require('../../utils/errorResponse');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const getUserByEmailQuery = `
    SELECT 
        customer_email,
        password
    FROM 
        Customers
    WHERE customer_email = ? AND password = ?;
`;

const login = async (req, res) => {
    try {
        const loginData = req.body;
        const hashedPassword = md5(loginData.password);
        const user = await getUserByEmail(loginData.customer_email, hashedPassword);
        
        console.log(user);
        if (user.length > 0) {
            const token = jwt.sign({ email: user[0].customer_email }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const responseObject = {
                message: "Logged in successfully",
                token: token
            };
            res.send(response(200, responseObject));
        } else {
            res.send(errResponse(401, 'Invalid credentials'));
        }
    } catch (error) {
        console.error('Error in login:', error.message);
        res.send(errResponse(500, 'Internal Server Error'));
    }
};

const getUserByEmail = async (email, password) => {
    try {
        const result = await executeQuery(getUserByEmailQuery, [email, password]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = login;
