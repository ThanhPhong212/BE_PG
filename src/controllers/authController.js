const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../models");
const db = data.data;

const authController = {
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.dataValues.id,
      },
      process.env.KEY_JWT,
      { expiresIn: "4h" }
    );
  },

  login: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        res.status(404).json("User not found");
      }
      const valiPassword = await bcrypt.compare(req.body.password, user.password);
      if (!valiPassword) {
        res.status(404).json("Wrong password!");
      }
      if (user && valiPassword) {
        const accsessToken = authController.generateToken(user);

        res.status(200).json({ user, accsessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hased = await bcrypt.hash(req.body.password, salt);
      const newUser = await db.User.create({
        username: req.body.username,
        password: hased,
        email: req.body.email,
      });
      await newUser.save();
      res.status(200).json("Create Account Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;