// const {google} = require('googleapis')
// require('dotenv').config();
// const CLIENT_ID =process.env.CLIENT_ID;
// const CLIENT_SECRET =process.env.CLIENT_SECRET;
// const REDIRET_URI = 'https://developers.google.com/oauthplayground';

// const REFRESH_TOKEN ='1//04tqP5XFpzrbjCgYIARAAGAQSNwF-L9IrcvRUCsyYPhVS-TJiawbXg2InaEWPCe5SmyPgCP2cmQLANWXFeVJa2p7WP_E8pyGJCM8';

// const path = require('path')
// const fs = require('fs')

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRET_URI
// );

// oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client,
// })
// export {drive, oauth2Client as default}
// const filepath = path.join(__dirname,'view.jpg')

// async function UploadFile(){
//     try {
//         const response = await drive.files.create({
//            requestBody:{
//             name: 'beautifull.jpg',
//             mimeType: 'image/jpg'
//            },
//            media: {
//             mimeType: 'image/jpg',
//             body: fs.createReadStream(filepath)
//            }
//         });
//         console.log(response.data);

//     } catch (error) {
//         console.log(error.message);
//     }
// }
// async function DeletFile(){
//     try {
//         const response = await drive.files.delete({
//             fileId: '1NXsj26LftwBejgfO5ViWPyOHe1DpxN2M',
//         })
//         console.log(response.data, response.status);
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// async function GeneratePublicUrl(){
//     try {
//     //   const fileId= '1-mcUYrObC6LEsHEb8i1ImqRbzTs3CS_j';
//     const fileId= '1oyR15eCCs5ZfFRsqroYjaxQxS55WniyH';
//       await drive.permissions.create({
//         fileId: fileId,
//         requestBody:{
//             role: 'reader',
//             type: 'anyone'
//         }
//       });
//       const result = await drive.files.get({
//         fileId: fileId,
//         fields:'webViewLink, webContentLink',
//       });
//       console.log(result.data.webViewLink);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// //UploadFile();
// //DeletFile();
// // GeneratePublicUrl();
