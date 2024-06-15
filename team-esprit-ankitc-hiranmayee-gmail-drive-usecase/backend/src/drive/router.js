const express = require('express');
const router = express.Router();
const { fetchAndUploadAttachments } = require("./controller");


router.post('/upload', fetchAndUploadAttachments); 

module.exports = router;
