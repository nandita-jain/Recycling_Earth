const jwt = require("jsonwebtoken");
const UserService = require("./user");
const User = require("../models/User");
const bcrypt = require("bcrypt");


let userService = new UserService();

class authService {

    authService() {

    }

    getLogin(req, res) {
        res.render("login");
    }

    //User Login Method
    async postLogin(req, res) {
        try {

            const user = await User.findOne({
                email: req.body.email
            });

            //user exists
            if (user) {
                const saltRounds = 10; //salt rounds used for hashing the password

                //comparing user entered password with saved user password
                if (bcrypt.compare(req.body.password, user.password)) {

                    //creating token with userId as payload
                    const token = await jwt.sign({
                        userId: user._id
                    }, process.env.SECRET_KEY);

                    //embedding the token inside the cookie
                    res.cookie('secret', token, {
                        maxAge: 86400,
                        httpOnly: true
                    });
                    console.log("Logged in Successfully");
                    return res.status(200).json("success");

                } else { //Invalid credentials
                    console.log("Invalid username or password");
                    return res.status(401).json({
                        message: "Invalid email or password!"
                    });
                }
            } else { //User not present in the database
                console.log("User not found");
                return res.status(404).json({
                    message: "User does not exist!"
                });
            }

        } catch (error) { //server error
            console.log("Server error");
            console.error(error);
            return res.status(500).json({
                message: "User not found, internal server error",
                error: error
            });
        }
    }

    getRegister(req, res) {
        res.render("register");
    }

    //User Registration Method
    async postRegister(req, res) {
        userService.createUser(req, res);
    }

    //Logout method
    async logout(req, res) {

        const response = await res.clearCookie('secret');
        if (response) {
            res.status(200).json({
                message: "Logged out Successfully!",
            });
        }
        // return res.redirect("/");
    }
}

module.exports = authService;