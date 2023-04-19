const express = require("express");

const router = express.Router();

const homeController = require("../controllers/user_controller");

router.get("/", homeController.home);
router.get("/sign-in", homeController.signIn);
router.post("/create-user", homeController.createUser);
router.post("/create-session", homeController.createSession);

module.exports = router;
