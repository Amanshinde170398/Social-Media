const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      username: "email",
    },
    function (email, password, done) {
      const user = User.findOne({ email: email });
      if (!user || user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// Set the value in cookie
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// get value from cookie
passport.deserializeUser(function (id, done) {
  const user = User.findById(id);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

module.exports = passport;
