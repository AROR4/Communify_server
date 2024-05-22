const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const User=require("../models/user")
const bcrypt=require("bcryptjs");

router.post("/signup",async (req,res)=>{
    try{
        const { name , email , password ,city ,age } = req.body;
        const existinguser=await User.findOne({email});
        if(existinguser){
            res.status(401).json({error: "User with same email exists" })
        }

        const hashedpassword=await bcrypt.hash(password,8);
        let newUser=new User({
            name,
            email,
            password: hashedpassword,
            city,
            age
        });

        const response=await newUser.save();
        console.log(response);
        const payload ={
            id: response.id,
            email: response.email,
        }
    
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        res.status(200).json({ ...response._doc, token });

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.post("/signin",async (req,res)=>{
    try{    
        const { email , password } = req.body;
        const user=await User.findOne({email});
        if(!user){
            res.status(401).json({error: "User with this email does not exist" })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({error: "invalid credentials"})
        }
        const payload={
            id: user.id,
            email: user.email,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        console.log("done")
        res.status(200).json({
            ...user._doc,
            token
        })
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
});

module.exports = router;