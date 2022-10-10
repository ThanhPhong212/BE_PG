const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const productController = {
  createProduct: async (req, res) => {
    try {
      const newProduct = await db.Product.create(req.body);
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

  searchProduct: async (req, res) => {
    try {
      const { name, price } = req.query;
      const nameT = name.charAt(0).toUpperCase() + name.slice(1);

      const search = await db.Product.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                // [Op.substring]: `${name.toUpperCase()}`,
                [Op.or]: [
                  { [Op.substring]: `${name}` },
                  { [Op.substring]: `${nameT}` },
                ],
              },
            },
            { price: { [Op.lte]: price.toString() } },
          ],
        },
        attributes: [
          "name",
          "description",
          "price",
          "amount",
          [Sequelize.col("Category.name"), "category"],
        ],
        include: [
          {
            model: db.Category,
            attributes: [],
          },
        ],
      });

      if (search.length === 0) {
        return res.status(404).json("No products found");
      }
      res.status(200).json(search);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  listProduct: async (req, res) => {
    try {
      const product = await db.Product.findAll({
        raw: true,
        attributes: [
          "name",
          "description",
          "price",
          "amount",
          [Sequelize.col("Category.name"), "category"],
        ],
        include: [
          {
            model: db.Category,
            attributes: [],
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
