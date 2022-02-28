const express=require('express');
const db= require('./routes/db');
const app=express();

require("dotenv").config();

app.use(express.text())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

const userRouter=require("./routes/user");

app.use("/app/",userRouter);

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started");
    db();
});