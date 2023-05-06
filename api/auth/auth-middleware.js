const userModel = require("../models/users-model");
const bcryptjs = require("bcryptjs");

const payloadCheck = function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "username ve password gereklidir" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const userNameCheck = function (req, res, next) {
  try {
    const checkedUsername = req.body.username;
    const userById = userModel.getByFilter({ username:checkedUsername });
    const isValidLogin =
      userById &&
      userById.lenght > 0 &&
      bcryptjs.compareSync(req.body.password, userById[0].password);
    if (!isValidLogin) {
      res.status(401).json({ message: "username alınmış" });
    } else {
      req.use = userById[0];
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  userNameCheck,
  payloadCheck,
};
