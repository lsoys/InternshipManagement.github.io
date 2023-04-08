const express = require("express")
const router = express.Router();
const controller = require("../controllers/candidate")
const authMiddleware = require("../middleware/authentication")

// GET REQUESTS
router.get("/", authMiddleware, controller.getCandidates);
router.get("/intern", authMiddleware, controller.getInterns);


// POST REQUESTS
router.post("/", authMiddleware, controller.addCandidate);


// PATCH REQUESTS
router.patch("/selection", authMiddleware, controller.candidateSelection);

module.exports = router;