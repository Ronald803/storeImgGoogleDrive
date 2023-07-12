const stream = require('stream')
const express = require('express')
const multer = require('multer')
const path = require('path')
const {google} = require('googleapis')

const uploadrouter = express.Router()
const upload = multer()

const KEYFILEPATH = path.join(__dirname + "/credentials.json")
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})
const uploadFile = async (fileObject)=>{
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const {data} = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({
        media:{
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody:{
            name: fileObject.originalname,
            parents: ['13YCbttCTQHU5RVrOiqUF042cb6eyWNZJ']
        },
        fields: "id,name"
    })
    console.log(`Uploaded file ${data.name} ${data.id}`)
}


uploadrouter.post('/upload',upload.any(),async(req,res)=>{
    console.log("Llego un post");
    //try {
        const {body,files} = req
        //console.log(body);
        //console.log(files);
        //for(let f=0; f<files.length;f++){
        //    console.log({f});
        //    await uploadFile(files[f])
        //}
        const mmm = await uploadFile(files[0])
        console.log({mmm});
        console.log(body)
        res.status(200).send("Form submitted")
    //} catch (error) {
    //    res.send(error.message)
    //}
})


module.exports = uploadrouter