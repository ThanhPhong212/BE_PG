const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const db = require("./models");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);

connectDB();
db.sequelize.sync({ alter: true });

let port = process.env.PORT || 6969;

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});
