const express = require("express")
const router = express.Router();
const controller = require("../controllers/candidate") 

// GET REQUESTS
router.get("/", controller.getCandidates);
router.get("/getInterns", controller.getInterns);

// POST REQUESTS
router.post("/", controller.addCandidate);

module.exports = router;