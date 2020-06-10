const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.user_find = function (req, res) {
  User.find({login: req.params.login}, (err, doc) => {
    if (err) throw err;
    if (doc.length){
      res.send(true)
    } else {
      res.send(false)
    }    
  });
};

exports.user_signup = function (req, res) {
  let user = {
    login: req.body.login,
    password: req.body.password,
  };  
  console.log(user);
  let result = jwt.sign(user, "secret");
  User.create(user, function (err, doc) {
    if (err) return console.log(err);
    console.log("Сохранен объект user", doc);
  }); 
  res.send({ token: result, login: user.login });
};

exports.user_verification = function (req, res, next) {
  if (req.body.token != undefined && req.body.token != undefined) {
    var decoded 
    async () => {
      decoded = jwt.verify(req.body.token, "secret");
      let result = await decoded 
      console.log(result);
      if (decoded) {
        res.send({
          isOk: true,
          login: decoded.login,
        });
      } else {
        next();
      }
    }   
    // console.log(req.body.token + " req.body.token");
    // console.log(decoded + " decoded");

  } else {
    next();
  }
};
exports.user_login = function (req, res) {
  const user = {
    login: req.body.login,
    password: req.body.password,
  };
  User.find(user, function (err, docs) {
    if (err || docs.length < 1) {
      console.log(docs);
      res.send({
        isOk: false,
      });
    } else {
      res.send({
        isOk: true,
        token: jwt.sign(user, "secret"),
        login: user.login,
      });
    }

  });
};
