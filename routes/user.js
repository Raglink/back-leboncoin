const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
// Call models
const User = require("../models/User");

router.post("/user/sign_up", (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: " l'email est manquant" });
  }
  if (!req.body.username) {
    return res.status(400).json({ message: " le pseudo est manquant" });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: " le mot de passe est manquant" });
  }
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.body.password + salt).toString(encBase64);
  const user = new User({
    email: req.body.email,
    token: token,
    salt: salt,
    hash: hash,
    account: {
      username: req.body.username
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
module.exports = router;
