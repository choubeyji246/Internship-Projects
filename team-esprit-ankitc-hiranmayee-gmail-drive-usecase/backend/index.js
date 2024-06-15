const express = require('express');
// const routes = require('./route');
const app = express();
const cors=require("cors")
const bodyParser=require("body-parser")
require('dotenv').config();

const expressFileUpload=require('express-fileupload')
const drive=require("./src/drive/router")
const gmail=require("./src/gmail/router")

const PORT = process.env.PORT || 4000;
app.use(cors())
app.use(expressFileUpload())
app.use(bodyParser.json()); 

// app.use('/', routes);
app.use("/drive",drive)
app.use("/gmail",gmail)

app.get("/",(req,res)=>{
    res.send("hello world");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

