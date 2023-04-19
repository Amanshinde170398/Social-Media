const User = require("../models/user");

module.exports.home = function (req, res) {
  return res.render("user/sign_up");
};

module.exports.signIn = function (req, res) {
  return res.render("user/sign_in");
};

module.exports.createUser = async (req, res) => {
  if (req.body["password"] != req.body["confirm-password"]) {
    return res.redirect("back");
  }

  const user = await User.exists({ email: req.body["email"] });
  if (user) {
    return res.render("user/sign_up");
  } else {
    User.create(req.body);
    res.render("user/sign_in");
  }
};

module.exports.createSession = async (req, res) => {
  console.log(req.cookies);
  res.redirect("back");
};
