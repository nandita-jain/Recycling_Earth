const jwt=require("jsonwebtoken");

const verify=async (req,res,next)=>{
    try {
        const token=await req.cookies["secret"];
        console.log(token);
        const payload=await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(payload);
        if(payload){
            req.user=payload.userId;
            next();
        }else{
            return res.status(401).json({message:"Unauthorized"});
        }
    } catch (error) {
        console.log("Unauthorized access");
        return res.status(501).json({message:"Internal server error","error":error});
    }
}

module.exports=verify;