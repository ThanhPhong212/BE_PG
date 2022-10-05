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
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
