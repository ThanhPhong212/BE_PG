const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.KEY_JWT, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    console.log(req.user);
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("Unable to take action");
      }
    });
  },
};

module.exports = middlewareController;
