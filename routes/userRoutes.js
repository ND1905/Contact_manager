const express = require("express")
const router = express.Router()
const {registerUser, currentUser, loginUser,demo} = require("../controller/userController")
const validateToken = require("../middleware/validateToken")

router.post("/register", registerUser)
router.post("/demo", demo)
router.post("/login", loginUser)
router.get("/current", validateToken, currentUser)

module.exports = router