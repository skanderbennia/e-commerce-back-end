const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  /***
   * @swagger
   *
   */
  .get(userController.getAllUser)

  .post(userController.addUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
