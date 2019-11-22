require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
app.use(formidableMiddleware());

//Call database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Call models
require("./models/User");
require("./models/Product");
// Call routes
const userRoutes = require("./routes/user");
const publishRoutes = require("./routes/publish");

// Active routes
app.use(userRoutes);
app.use(publishRoutes);

app.listen(4000, () => {
  console.log("Server started");
});
