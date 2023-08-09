// to validate the access token from client.
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async function(req, res, next){
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    // console.log(authHeader);
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
            if(err){
                res.status(401)
                throw new Error("User is not authorised")
            }
            req.user = decoded.cuser;
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("User is not authorised or token is missing")
        }
    }
})

module.exports = validateToken