const express = require("express");
const router = express.Router()
const { getContacts, getContact, putContact, createContact, deleteContact} = require("../controller/contactController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken)
// we are adding above validate Token in order to associate all
// the CRUD op with the user and in order to make these operation private
// one method can be to add validateToken to all routes or simply write 
// above line to auto attch to all routes. 
router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(putContact).delete(deleteContact)

module.exports = router;