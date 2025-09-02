const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");
const sendNewsletter = require("../controllers/sendNewsletterController");
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/check-subscription/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const existing = await Newsletter.findOne({ email });
    res.status(200).json({ isSubscribed: !!existing });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/unsubscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await Newsletter.deleteOne({ email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/send", sendNewsletter);


module.exports = router;
