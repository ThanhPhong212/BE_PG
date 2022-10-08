module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },

    fullname: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      defaultValue: "",
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
      unique: true,
      required: false,
      allowNull: false,
    },
  });

  // User.belongsTo(AllCode, {
  //   foreignKey: "roleId2",
  //   // as: "roleData",
  // });

  // AllCode.hasOne(User, {
  //   foreignKey: "roleId2",
  //   // as: "roleData",
  // });
  //
  // Product.belongsTo(AllCode, {
  //   foreignKey: "categoryID",
  //   targetKey: "key",
  //   as: "categoryData",
  // });

  // AllCode.hasMany(Product, {
  //   foreignKey: "categoryID",
  //   as: "categoryData",
  // });

  return { User, Product, AllCode };
};
