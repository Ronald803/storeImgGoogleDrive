const express = require('express');
const uploadrouter = require('./router')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(uploadrouter)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(5000,()=>{
    console.log('App is listening on port 5000');
})