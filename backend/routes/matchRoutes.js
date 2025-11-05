const express = require("express");
const router = express.Router();
const matchController = require("../controller/matchController");
const auth = require("../middleware/auth");

router.get("/match/:seekerId", auth, matchController.matchCaregiver);

module.exports = router;
