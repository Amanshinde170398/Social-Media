const express = require("express");
const router = express.Router();
const passport = require("passport");
const homeController = require("../controllers/user_controller");

router.get("/", homeController.home);
router.get("/sign-in", homeController.signIn);
router.post("/create-user", homeController.createUser);
router.get(
  "/user-profile",
  passport.checkAuthentication,
  homeController.userProfile
);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/sign-in" }),
  homeController.createSession
);
module.exports = router;
