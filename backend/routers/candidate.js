const express = require("express")
const router = express.Router();
const controller = require("../controllers/candidate")
const authMiddleware = require("../middleware/authentication")

// GET REQUESTS
router.get("/", authMiddleware, controller.getCandidates);
router.get("/search", authMiddleware, controller.searchCandidates);
router.get("/intern", authMiddleware, controller.getInterns);
router.get("/intern/search", authMiddleware, (req, res, next) => {
    controller.searchCandidates(req, res, next, 1)
});


// POST REQUESTS
router.post("/", authMiddleware, controller.addCandidate);


// PATCH REQUESTS
router.patch("/selection", authMiddleware, controller.candidateSelection);

module.exports = router;