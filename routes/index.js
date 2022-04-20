const express=require("express");
const router=express.Router();
const verifyGuest=require("../middlewares/verify");
const UserService=require("../services/user");

const userService=new UserService();

router.get("/",async (req,res)=>{
    let data=null;

    //checking the length of the cookies object, to see if the user is logged in or not
    if(Object.keys(req.cookies).length!==0){
        
        //verifying guest to get the user id of the user in request header
        await verifyGuest(req,res,async()=>{
            const user=await userService.getUser(req,res); //getting user info from the database
            data={
                city:user.city,
                state:user.state,
                pincode:user.pincode,
                apiKey:process.env.API_KEY
            }
            let link=`https://www.google.com/maps/embed/v1/search?key=${data.apiKey}&q=garbage+dump+in+${data.city}+${data.state}+India+near+${data.pincode}`;
        
            res.render("home",{"data":link});
        });
    }
    // console.log(data);
    else{
        res.render("home",{"data":data});
    }
})
router.get("/secret",verifyGuest,(req,res)=>{
    res.render("secret");
})
module.exports=router;