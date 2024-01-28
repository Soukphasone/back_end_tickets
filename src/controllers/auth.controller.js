const hash = require("../helpers/encrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.login = async (req, res) => {
  try {
    if (!req.body.username && !req.body.password) {
      return res.status(400).json({ message: `USERID_AND_PASSWORD_IS_EMPTY` });
    }
    const findBy = {};
    findBy.username = req.body.username;
    findBy.password = req.body.password;
    const _user = await User.findOne({ username: req.body.username, password: req.body.password }).exec();
    if (!_user) {
      return res.status(400).json({ message: `INVALID_USERNAME_OR_PASSWORD` });
    }
    const accessToken = jwt.sign(
      {
        id: _user._id,
        username: _user.username,
        role: _user.role,
        status: _user.status,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({ accessToken, data: _user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `SERVER_IS_PROBLEM: ${error}` });
    return;
  }
};