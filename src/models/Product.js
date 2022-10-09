const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
