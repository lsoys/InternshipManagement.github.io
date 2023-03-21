const express = require("express")
const router = express.Router();
const controller = require("../controllers/candidate")
const authMiddleware = require("../middleware/authentication")

// GET REQUESTS
router.get("/", authMiddleware, controller.getCandidates);
router.get("/getInterns", controller.getInterns);

// POST REQUESTS
router.post("/", controller.addCandidate);

module.exports = router;