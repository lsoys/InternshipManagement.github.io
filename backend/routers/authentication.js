const express = require("express")
const router = express.Router();
const controller = require("../controllers/authentication");
const authMiddleware = require("../middleware/authentication")

router.post("/login", controller.login);
router.post("/verify", authMiddleware, controller.checkVerify)
// router.post("/signup", controller.signup);

module.exports = router;