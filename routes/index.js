const express=require("express");
const router=express.Router();
const verifyGuest=require("../middlewares/verify");

router.get("/",(req,res)=>{
    res.render("home");
})
router.get("/secret",verifyGuest,(req,res)=>{
    res.render("secret");
})
module.exports=router;