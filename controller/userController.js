const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const path = require("path");
// @desc user registeration
// @oute POST /api/users/register
//@access public

const demo = async (req, res) => {

    res.render("demo");

}
const registerUser = asyncHandler(async function (req, res) {
    console.log(req.body.username);
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered!")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    console.log(`User created ${user}`);
    if (user) {
        res.render("logedin", { email: email, password: password })
        // res.status(201).json({_id: user.id, email: user.email})
    }
    else {
        res.status(400)
        throw new Error("User data is not valid")
    }

    res.json({ message: "register yourself" })
})

// @desc user registeration
// @oute POST /api/users/login
//@access public 
const loginUser = asyncHandler(async function (req, res) {
    // console.log(req.body);
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    // compare password with hashed password

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            cuser: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "45m" }
        )
        // res.status(200).json({ accessToken })
        
        // res.render("demo");

        res.render("logedin",{token : accessToken})
    }
    else {
        res.status(401)
        throw new Error("email or password is not valid")
    }

})

// @desc current user
// @oute POST /api/users/current
// @access private
const currentUser = asyncHandler(async function (req, res) {
    res.json(req.user)
    // console.log(req.body);
    // const sen={
    //     cuser: req.user.username,
    //     cemail: req.user.email
    // }
    // res.render("logedin",{ user : sen })
})

module.exports = { registerUser, currentUser, loginUser, demo }