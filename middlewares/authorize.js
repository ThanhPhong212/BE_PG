const jwt = require("jsonwebtoken");
const data = require("../models");
const db = data.data;

function authorize(roleID = []) {
  if (typeof roleID === "string") {
    roleID = [roleID];
  }
  return [
    (req, res, next) => {
      const bearerHeader = req.headers["authorization"];
      if (!bearerHeader) {
        return res.json("Please login to access the data");
      }
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      const verify = jwt.verify(bearerToken, process.env.KEY_JWT);
      db.User.findByPk(verify.id).then((user) => {
        if (!user) {
          return res.json("User does not exist");
        }
        if (roleID.length && !roleID.includes(user.roleID)) {
          return res.json("User does not exist");
        }
      });
      next();
    },
  ];
}
module.exports = authorize;
