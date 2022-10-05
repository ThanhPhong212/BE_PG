const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

const authController = {
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.KEY_JWT,
      { expiresIn: "30s" }
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
    } catch (error) {}
  },
};

module.exports = authController;
