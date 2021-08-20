const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.signIn);

// router.post("/signUp", authController.addUser);
module.exports = router;
