const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.user_signup = function (req, res) {
  console.log(req.body);

  let user = {
    login: req.body.login,
    password: req.body.password,
  };
  User.create(user, function (err, doc) {
    if (err) return console.log(err);
    console.log("Сохранен объект user", doc);
  });
  let result = jwt.sign(user, "secret");
  res.send({ token: result,
  login: user.login });
};

exports.user_verification = function (req, res, next) {
  if (req.body.token && req.body.token != undefined) {
    var decoded = jwt.verify(req.body.token, "secret");
    if (decoded) {
      console.log("all is fine");
      res.send({
        isOk: true, 
        login: decoded.login
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
exports.user_login = function (req, res) {
  const user = {
    login: req.body.login,
    password: req.body.password,
  };
  console.log(user);
  User.find(user, function (err, docs) {
    if (err) {
      res.send({
        isOk: false,
      });
    }
    res.send({
      isOk: true,
      token: jwt.sign(user, "secret"),
      login: user.login
    });
  });
};
