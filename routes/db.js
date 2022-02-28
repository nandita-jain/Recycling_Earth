const mongoose=require("mongoose");

const db=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/community");
        console.log("Connected to the database");
    }
    catch{
        console.log("Failed to connect to the databse, internal server error");
    }
}

module.exports=db;