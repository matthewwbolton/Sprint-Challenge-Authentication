const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret.jwtSecret, options);
};
