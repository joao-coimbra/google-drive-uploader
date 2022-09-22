const path = require('path');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const { google } = require('googleapis');
const GoogleDriveStorage = require('multer-google-drive')
const { JWT } = require('google-auth-library');
const keys = require('./jwt.keys.json');
// const destroyer = require('server-destroy');
// var clc = require("cli-color")

const app = express()

const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/drive'],
});
// console.log(auth)
var drive = google.drive({ version: 'v3', auth })

// drive.files.list({
//     q: "'13cwgGNCM_hSO3FOqtd6W8oS2GOHNdOTK' in parents and trashed=false",
// }, (err, res) => {
//     if (err) throw err;

//     res.data.files.forEach(file => {
//         if (file.mimeType !== 'application/vnd.google-apps.folder') {
//             // drive.files.delete({fileId:file.id}).then(console.log)
//             // console.log(file)
//         }
//     });
//     // console.log(res.data.files)

// });

// drive.files.get({fileId:"1tOg32f8PTVSnaQL7SxTkmlhOlwSgfiOs"}).then(console.log)

// drive.files.delete({fileId:"1oUO3NihlFfvg23oQ_cM798P6tt5ZmFxk"}).then(console.log)

// console.log(drive);

// main().catch(console.error)

// https://drive.google.com/uc?id=xxxxxx

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

var upload = multer({
    storage: GoogleDriveStorage({
        drive: drive,
        parents: '13cwgGNCM_hSO3FOqtd6W8oS2GOHNdOTK',
        fileName: function (req, file, cb) {
            // console.log(file)
            let filename = `test-${file.originalname}`;
            cb(null, filename);
        }
    })
})

app.post('/upload', upload.any(), function (req, res, next) {
    let files = req.files
    console.log(files)
    // console.log(req)
    // res.send({fileId: files.map(f => f.fileId)})
    res.redirect('back');
})

app.listen(8080, () => {
    console.log('Form running on port 8080');
});