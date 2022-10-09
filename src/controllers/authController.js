const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

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
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        res.status(404).json("User not found");
      }
      const vailPassword = await bcrypt.compare(req.body.password, user.password);
      if (!vailPassword) {
        res.status(404).json("Wrong password!");
      }

      if (user && vailPassword) {
        const accessToken = authController.generateToken(user);

        res.status(200).json({ user, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
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
