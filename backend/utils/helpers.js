const jwt = require("jsonwebtoken");

exports.getToken = async (email, userId) => {
  const token = jwt.sign({ identifier: userId }, process.env.SECRET_KEY);
  return token;
};



