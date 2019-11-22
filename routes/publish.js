const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// TERMINER UPLOAD CLOUDINARY

// Call models
const User = require("../models/User");
const Product = require("../models/Product");

router.post("/offer/publish", (req, res) => {
  if (!req.fields.title || !req.fields.description || !req.fields.price) {
    return res.status(400).json({ message: "un éléments est manquant" });
  }
  if (!req.files.picture) {
    return res.status(400).json({ message: "le fichier est manquant" });
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    cloudinary.uploader.upload(req.files.picture.path, async function(
      error,
      result
    ) {
      if (!error) {
        const newPicture = new Picture({
          url: result.secure_url
        });
        await newPicture.save();
      }

      console.log(result, error);
    });
  } catch (error) {}

  return res.json({ message: "ok" });
});

module.exports = router;
