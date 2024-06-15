const express = require('express');
const router = express.Router();

const { sendMail } = require("./controller");


router.post('/mail', sendMail);

module.exports = router;