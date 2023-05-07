const express = require("express")
const router = express.Router();
const controller = require("../controllers/feedback")
const authMiddleware = require("../middleware/authentication")

// GET
router.get("/", authMiddleware, controller.getFeedback);

// POST
router.post("/", authMiddleware, controller.addFeedback);


module.exports = router;
