const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

//Call database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Call models
require("./models/User");
// Call routes
const signUpRoutes = require("./routes/signUp");
const logInRoutes = require("./routes/logIn");

// Active routes
app.use(signUpRoutes);
app.use(logInRoutes);

app.listen(4000, () => {
  console.log("Server started");
});
