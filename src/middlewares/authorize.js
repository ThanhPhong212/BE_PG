const jwt = require("jsonwebtoken");
const { json } = require("sequelize");
const db = require("../models");

function authorize(role = []) {
  if (typeof role === "string") {
    role = [role];
  }
  return [
    (req, res, next) => {
      const bearerHeader = req.headers["authorization"];

      if (!bearerHeader) {
        return res.json("Please login to access the data");
      }
      const bearer = bearerHeader.split(" ")[1];
      jwt.verify(bearer, process.env.KEY_JWT, (err, user) => {
        if (err) {
          return res.status(403).json("Invalid token");
        }
        req.user = user;
        db.User.findByPk(user.id).then((user) => {
          if (!user) {
            return res.status(404), json("User does not exist");
          }
          if (role.length && !role.includes(user.role)) {
            return res.send("You cannot perform this action");
          }
        });
      });

      next();
    },
  ];
}
module.exports = authorize;
