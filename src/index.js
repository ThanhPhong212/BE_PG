const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const db = require("./models");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);

connectDB();

// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

let port = process.env.PORT || 6969;

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port : " + port);
});
