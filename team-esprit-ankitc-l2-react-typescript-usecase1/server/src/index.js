require('dotenv').config()
const express = require('express')
const app = express()
const cors= require("cors")
const {errorHandler}=require('./utils/errorHandler')
const orders= require("./orders/router")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler) 

app.use('/orders', orders)

app.listen(3001, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port 3001');
    }
});

app.get('/', (req, res) => {
    res.send('hello world');
});