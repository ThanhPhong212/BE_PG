const db = require("../models");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const newCategory = await db.Category.create(req.body);
      await newCategory.save();
      res.status(200).json("Create Success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  editCategory: async (req, res) => {
    try {
      const category = await db.Category.update(req.body, {
        where: { id: req.params.id },
      });
      if (category == 1) {
        return res.status(200).json("Update success");
      } else {
        return res.status(500).json("Update fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await db.Category.destroy({
        where: { id: req.params.id },
      });
      if (category == 1) {
        return res.status(200).json("Delete category success");
      } else {
        return res.status(500).json("Delete category fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCategory: async (req, res) => {
    try {
      const category = await db.Category.findAll();
      if (!category) {
        return res.status(404).json("Category does not exist");
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = categoryController;
