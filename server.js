//Dependencies
const express = require('express');
const db = require('./middlewares/db');
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//Config Path
dotenv.config({
    path: './config/config.env'
});

//Cookie Parser
app.use(cookieParser());

//Encoded Data Formatting
app.use(express.text())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//View Engine
app.set('view engine', 'ejs');
app.use(express.static("public"));



// app.get("/", (req, res) => {
//     res.render("home.ejs");
// });



//Routers
const authRouter = require("./routes/auth");
const homeRouter = require("./routes/index");

app.use("/auth/", authRouter);
app.use("/", homeRouter);

app.get("/map", (req, res) => {
    res.render("posts");
})

//Server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
    db();
});