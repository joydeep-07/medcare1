const express = require("express");
const Review = require("../models/Review"); 

const router = express.Router();
router.post("/reviews", async (req, res) => {
  try {
    const { reviewText, userFullName, userEmail } = req.body;
    if (!reviewText || !userFullName || !userEmail) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: reviewText, userFullName, and userEmail are necessary.",
        });
    }

   
    const newReview = new Review({
      reviewText,
      userFullName,
      userEmail,
      
    });

    
    await newReview.save();

   
    res.status(201).json({
      message: "Review submitted successfully!",
      review: newReview,
    });
  } catch (error) {
  
    if (error.name === "ValidationError") {
      
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }
    
    console.error("Error saving review:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Could not save review." });
  }
});


router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Could not fetch reviews." });
  }
});

module.exports = router;
