const jwt = require("jsonwebtoken");
const config = require("../utils/config");
exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, config.SECRET, {
    expiresIn: expired,
  });
};
