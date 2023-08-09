// logic for the routes
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
// @desc get all contacts
// @oute GET /api/contacts
//@access private
const getContacts = asyncHandler(async function (req, res) {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts)
})
// @desc Create contacts
// @oute POST /api/contacts
//@access private
const createContact = asyncHandler(async function (req, res) {
    console.log("The received creds : ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})
// @desc get a contact
// @oute POST /api/contacts/id
//@access private
const getContact = asyncHandler(async function (req, res) {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
// @desc update a contact
// @oute GET /api/contacts/id
//@access private
const putContact = asyncHandler(async function (req, res) {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other user contacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updateContact)
})
// @desc delete a contact
// @oute delete /api/contacts/id
//@access private
const deleteContact = asyncHandler(async function (req, res) {
    console.log("2got here");
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    console.log("1got here");
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to delete other user contacts")
    }
    console.log("got here");
    console.log(contact);
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
})

module.exports = { getContacts, getContact, putContact, createContact, deleteContact };