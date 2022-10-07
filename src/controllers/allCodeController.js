const data = require("../models");
const db = data.data;

const allCodeController = {
  createAllCode: async (req, res) => {
    try {
      const newCode = await db.AllCode.create({
        key: req.body.key,
        type: req.body.type,
        value: req.body.value,
      });

      await newCode.save();
      res.status(200).json("Create Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  editAllCode: async (req, res) => {
    try {
      const code = await db.AllCode.update(req.body, {
        where: { id: req.params.id },
      });
      if (code == 1) {
        return res.status(200).json("Update success");
      } else {
        return res.status(500).json("Update fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteAllCode: async (req, res) => {
    try {
      const code = await db.AllCode.destroy({
        where: { id: req.params.id },
      });
      if (code == 1) {
        return res.status(200).json("Delete success");
      } else {
        return res.status(500).json("Delete  fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getType: async (req, res) => {
    try {
      const type = await db.AllCode.findAll({
        where: {
          type: req.query.type,
        },
      });
      if (!type) {
        return res.status(404).json("Not found");
      }
      res.status(200).json(type);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = allCodeController;
