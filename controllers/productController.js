const data = require("../models");
const db = data.data;

const productController = {
  createProduct: async (req, res) => {
    try {
      const newProduct = await db.Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        categoryID: req.body.categoryID,
      });
      await newProduct.save();
      res.status(200).json("Create successful products");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      const product = await db.Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (product != 1) {
        return res.status(404).json("No products found");
      }
      return res.status(200).json("Product update successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await db.Product.destroy({
        where: { id: req.params.id },
      });
      if (product == 1) {
        return res.status(200).json("Delete product success");
      } else {
        return res.status(500).json("Delete product fail");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchProduct: async (req, res) => {},
  listProduct: async (req, res) => {
    try {
      const product = await db.Product.findAll({
        include: [
          {
            model: db.AllCode,
            as: "categoryData",
            attributes: ["value"],
          },
        ],
      });
      if (!product) {
        return res.status(404).json("No products found");
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productController;
