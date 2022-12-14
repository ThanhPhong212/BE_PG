const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
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

  editUser: async (req, res) => {
    try {
      const user = await db.User.update(req.body, {
        where: { id: req.params.id },
      });
      if (user == 1) {
        return res.status(200).json("Update user success");
      } else {
        return res.status(500).json("Update user fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await db.User.destroy({
        where: { id: req.params.id },
      });
      if (user == 1) {
        return res.status(200).json("Delete user success");
      } else {
        return res.status(500).json("Delete user fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneUser: async (req, res) => {
    let id = req.params.id;
    try {
      const user = await db.User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) {
        return res.status(404).json("User does not exist");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const user = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) {
        return res.status(404).json("User does not exist");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
