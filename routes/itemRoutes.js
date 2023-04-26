const express = require("express");
const router = express.Router();
const usersController = require("../controllers/itemController");

router
  .route("/")
  .get(usersController.getAllItems)
  .post(usersController.createNewItem);

module.exports = router;
