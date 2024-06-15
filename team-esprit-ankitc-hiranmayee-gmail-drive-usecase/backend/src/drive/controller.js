const fs = require("fs");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const gmail = google.gmail("v1");

const { Readable } = require("stream");

const oAuth2Client = new OAuth2Client({
  clientId: process.env.RECEIVERS_CLIENT_ID,
  clientSecret: process.env.RECEIVERS_CLIENT_SECRET,
  redirectUri: process.env.RECEIVERS_REDIRECT_URI,
  scopes: [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

oAuth2Client.setCredentials({
  access_token: process.env.RECEIVERS_ACCESS_TOKEN,
  refresh_token: process.env.RECEIVERS_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oAuth2Client });

async function fetchUnreadEmails() {
  const response = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread",
    auth: oAuth2Client,
  });
  console.log(response.data.messages);
  const messages = response.data.messages || [];
  return messages;
}

async function downloadAttachments(messageId) {
  const message = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    auth: oAuth2Client,
  });

  const parts = message.data.payload.parts;

  if (parts) {
    for (const part of parts) {
      const body = part.body;
      console.log(body);
      if (body.attachmentId) {
        const attachment = await gmail.users.messages.attachments.get({
          userId: "me",
          messageId: messageId,
          id: body.attachmentId,
          auth: oAuth2Client,
        });

        const filename = `attachment_${messageId}_${part.filename}`;
        //fs.writeFileSync(filename, Buffer.from(attachment.data.data, "base64"));
        const attachmentData = {
          filename: filename || "untitled", // Using part.filename or a default name
          data: Buffer.from(attachment.data.data, "base64"),
        };
        console.log(`Attachment ${attachmentData.filename} downloaded.`);
        return attachmentData;
      }
    }
  }
}
async function uploadFileToDrive(attachmentData) {
  const today = new Date();
  const folderName = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  // Check if the folder already exists
  let folderId;
  try {
    const folderQuery = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const folderResponse = await drive.files.list({
      q: folderQuery,
      fields: "files(id)",
    });
    if (folderResponse.data.files.length > 0) {
      folderId = folderResponse.data.files[0].id;
    } else {
      
      // Create the folder if it doesn't exist
      const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      };
      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });
      folderId = folder.data.id;
      console.log(`Folder created with ID: ${folderId}`);
    }
  } catch (err) {
    console.error("Error checking/creating folder:", err);
    throw err;
  }

  // Upload the file to the folder
  const fileMetadata = {
    name: attachmentData.filename,
    parents: [folderId],
  };
  const dataStream = new Readable();
  dataStream.push(attachmentData.data);
  dataStream.push(null);

  const media = {
    mimeType: "application/octet-stream",
    body: dataStream,
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    console.log(
      `File ${attachmentData.filename} uploaded to Drive with ID: ${response.data.id}`
    );
    return response.data.id;
  } catch (err) {
    console.error("Error uploading file to Drive:", err);
    throw err;
  }
  // const fileMetadata = { name: attachmentData.filename };
  // const dataStream = new Readable();
  // dataStream.push(attachmentData.data);
  // dataStream.push(null);

  // const media = {
  //   mimeType: "application/octet-stream",
  //   body: dataStream,
  // };

  // const response = await drive.files.create({
  //   resource: fileMetadata,
  //   media: media,
  //   fields: "id",
  //   auth: oAuth2Client,
  // });

  // console.log(
  //   `File ${attachmentData.filename} uploaded to Drive with ID: ${response.data.id}`
  // );
}

fetchAndUploadAttachments = async (req, res) => {
  const messages = await fetchUnreadEmails();

  for (const message of messages) {
    const messageId = message.id;
    const filename = await downloadAttachments(messageId);
    if (filename) {
      await uploadFileToDrive(filename);
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        requestBody: { removeLabelIds: ["UNREAD"] },
        auth: oAuth2Client,
      });
      res.send("Data uploaded successfully.");
    }
  }
  return;
};

module.exports = { fetchAndUploadAttachments };
