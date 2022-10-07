module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },

    roleID: {
      required: true,
      type: Sequelize.STRING,
    },
  });

  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },

    description: {
      type: Sequelize.STRING,
      required: false,
    },

    price: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },

    amount: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false,
    },

    categoryID: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  });
  const AllCode = sequelize.define("allCode", {
    type: {
      type: Sequelize.STRING,
      required: false,
      allowNull: false,
    },

    key: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },

    value: {
      type: Sequelize.STRING,
      required: false,
      unique: true,
      allowNull: false,
    },
  });

  User.belongsTo(AllCode, {
    foreignKey: "roleID",
    targetKey: "key",
    as: "roleData",
  });

  AllCode.hasMany(User, {
    foreignKey: "roleID",
    as: "roleData",
  });

  Product.belongsTo(AllCode, {
    foreignKey: "categoryID",
    targetKey: "key",
    as: "categoryData",
  });

  AllCode.hasMany(Product, {
    foreignKey: "categoryID",
    as: "categoryData",
  });

  return { User, Product, AllCode };
};
