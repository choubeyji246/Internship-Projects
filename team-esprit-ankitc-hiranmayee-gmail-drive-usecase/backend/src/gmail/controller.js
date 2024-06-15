const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const fs = require("fs");
const path = require('path')
const assetsFolder = path.join(__dirname, 'assets');

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (req, res) => {
let attachment;
  try {
    const { receiver, subject, message} = req.body;
    console.log(receiver,subject,message);
    if(req.files && req.files.attachment){ //checking if any attachment is there in req.files
      attachment = req.files.attachment;
      attachment.mv(path.join(assetsFolder, attachment.name))
    }
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",

      secure: false,
      logger: true,
      debug: true,
      auth: {
        type: "OAuth2",
        user: "hiranmayee@ncompass.inc",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "Hiranmayee :)) <hiranmayee@ncompass.inc>",
      to: receiver,
      subject: subject,
      text: message,
      attachments: attachment? [{filename: attachment.name, path: path.join(assetsFolder, attachment.name)}]:null
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    res.send("mail sent successfully");
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { sendMail };
