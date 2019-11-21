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
const userRoutes = require("./routes/user");

// Active routes
app.use(userRoutes);

app.listen(4000, () => {
  console.log("Server started");
});
