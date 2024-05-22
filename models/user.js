const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email :{
        type: String,
        required:true,
        trim: true,
        validate: {
            validator: (value)=>{
                const re="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
                return value.match(re);
            },
            message: "Please enter a valid email address",
        }
    },
    password : {
        type: String,
        required: true,
        validate: {
            validator: (value)=>{
                
                return value.length > 6;
            },
            message: "Please enter a long password",
        }
    },
    age : {
        type: Number,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    
    hours : {
        type: Number,
        default: 0,
    },
    badges :[
        {
            type: String
        }
    ]

});

// userSchema.pre('save', async (next)=>{
//     const User=this;
//     if(!User.isModified('password')) return next();
//     try{

//         const salt=bcrypt.getSalt(10);
//         const hashedpassword=await bcrypt.hash(person.password,salt);
//         User.password=hashedpassword;
//         next();
//     }
//     catch(err){
//         return next(err);
//     }
// })

const User=mongoose.model("User",userSchema);
module.exports=User;