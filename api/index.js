const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// for vercel deployment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const port = process.env.PORT || 5000;
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// all your routes should go here
app.use("/api/auth", require(path.join(__dirname, "/routes/auth.js")));
app.use("/api/users", require(path.join(__dirname, "/routes/user.js")));
app.use("/api/products", require(path.join(__dirname, "/routes/product.js")));
app.use("/api/orders", require(path.join(__dirname, "/routes/order.js")));
app.use("/api/carts", require(path.join(__dirname, "/routes/cart.js")));
app.use("/api/mail", require(path.join(__dirname, "/routes/mail.js")));

// static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server is running on port 5000!");
// });
