const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
// Call models
const User = require("../models/User");

// CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/user/sign_up", (req, res) => {
  if (!req.fields.email) {
    return res.status(400).json({ message: " l'email est manquant" });
  }
  if (!req.fields.username) {
    return res.status(400).json({ message: " le pseudo est manquant" });
  }
  if (!req.fields.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);
  const user = new User({
    email: req.fields.email,
    token: token,
    salt: salt,
    hash: hash,
    account: {
      username: req.fields.username
    }
  });
  user.save(function(err) {
    if (err) {
      return next(err.message);
    } else {
      return res.json({
        _id: user._id,
        token: user.token,
        account: user.account
      });
    }
  });
});
// READ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/user/log_in", async (req, res) => {
  if (!req.fields.email) {
    return res.status(400).json({ message: " l'email est manquant" });
  }
  if (!req.fields.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  const isKnownUser = await User.findOne({ email: req.fields.email });
  if (!isKnownUser) {
    return res.status(400).json({ error: "utilisateur non trouvé" });
  }
  const hash = SHA256(req.fields.password + isKnownUser.salt).toString(
    encBase64
  );
  if (hash === isKnownUser.hash) {
    return res.status(200).json({
      _id: isKnownUser._id,
      token: isKnownUser.token,
      account: { username: isKnownUser.account.username }
    });
  } else {
    return res.status(400).json({ error: "utilisateur non trouvé" });
  }
});

module.exports = router;
