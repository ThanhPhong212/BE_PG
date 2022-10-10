const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: "Please enter all the details" });
      }
      const user = await db.User.findOne({ where: { email: email } });
      if (!user) {
        return res.json({ message: "Wrong email" });
      }
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isMatch) {
        return res.json({ message: "Wrong  password" });
      }
      const token = jwt.sign({ id: user.id }, process.env.KEY_JWT, {
        expiresIn: "4h",
      });
      const fullName = user.fullName;
      return res.status(200).json({ fullName, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashed;
      const newUser = await db.User.create(req.body);
      await newUser.save();
      res.status(200).json("Create Account Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
