const express = require("express")
const router = express.Router();
const controller = require("../controllers/authentication");

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;