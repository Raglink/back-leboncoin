const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Call models
const User = require("../models/User");

router.post("/user/log_in", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: " l'email est manquant" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  const isKnownUser = await User.findOne({ email: req.body.email });
  if (!isKnownUser) {
    return res.status(400).json({ error: "user not found" });
  }
  const hash = SHA256(req.body.password + isKnownUser.salt).toString(encBase64);
  if (hash === isKnownUser.hash) {
    return res.status(200).json({
      _id: isKnownUser._id,
      token: isKnownUser.token,
      account: { username: isKnownUser.account.username }
    });
  } else {
    return res.status(400).json({ error: "user not found" });
  }
  return res.json({ message: "hello" });
});
module.exports = router;
