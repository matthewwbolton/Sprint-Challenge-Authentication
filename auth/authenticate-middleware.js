const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({
      message: `Please provide valid login credentials in order to proceed!`,
    });
  }
};
