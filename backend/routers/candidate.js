const express = require("express")
const candidateController = require("../controllers/candidate")

router = express.Router();

// GET methods
router.get("/", candidateController.getCandidates)

// POST methods
router.get("/", candidateController.createCandidate)

module.exports = router;