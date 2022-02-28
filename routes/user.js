const User=require("../models/User");

const express=require("express");

const userRouter=express.Router();

userRouter.post("/join",join);

async function join(req,res) {
    console.log(req.body);

    let {name,email,phone,pincode,message}=req.body;
    
    const newUser=new User({
        name:name,
        email:email,
        mobile:phone,
        pincode:pincode
    });

    const user=await User.create(newUser);

    if(user){
        console.log("User joined successfully!");
        res.status(200).json("User joined successfully!");
    }else{
        console.log("User failed to join,Internal Server Error");
    }
}


module.exports=userRouter;