const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      console.log(user);
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

// check if user isauthenticated
passport.checkAuthentication = function (req, res, next) {
  // if user signed in passs request to next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if user is not signed in
  return res.redirect("/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from session cookie and we are sending to local for views
    res.locals.user = req.User;
  }
  next();
};

module.exports = passport;
