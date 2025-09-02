const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  sendReply,
} = require("../controllers/contactController");

router.post("/create", createContact);
router.get("/all", getContacts);
router.post("/reply", sendReply);

module.exports = router;
