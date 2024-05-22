const express=require("express");
const app=express();

const auth=require('./routes/auth');
const bodyParser = require('body-parser'); 
const port=process.env.PORT || 3000;
const db=require("./db");
// const passport = require('./auth');
app.use(bodyParser.json()); // req.body
app.use("/user",auth);
app.listen(port,()=>{
    console.log("listening on Port: ",port);
})