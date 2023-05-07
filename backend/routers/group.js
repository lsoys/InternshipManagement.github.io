const express = require("express")
const router = express.Router();
const controller = require("../controllers/group")
const authMiddleware = require("../middleware/authentication")

// GET
router.get("/", authMiddleware, controller.getGroups);
router.get("/search", authMiddleware, controller.searchGroups)

// POST
router.post("/", authMiddleware, controller.addGroup);

// DELETE
router.delete("/", authMiddleware, controller.deleteGroup);

module.exports = router;