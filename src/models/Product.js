const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //   const rawValue = this.getDataValue("name");
        //   return rawValue ? rawValue.toUpperCase() : "null";
        // },
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
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
