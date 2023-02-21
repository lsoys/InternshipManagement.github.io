const express = require("express")
const candidateController = require("../controllers/candidate")

router = express.Router();

// GET methods
router.get("/asdf", candidateController.getCandidates)

// POST methods
router.get("/", candidateController.createCandidate)

module.exports = router;