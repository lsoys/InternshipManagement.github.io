const Candidate = require("../models/candidate")

const controller = {
    // GET REQUESTS
    async getCandidates(req, res, next) {
        const candidates = await Candidate.find();
        res.send(candidates)
    },

    getInterns(req, res, next) {
        res.send("get interns");
    },

    // POST REQUESTS
    async addCandidate(req, res, next) {
        try {
            const candidate = await Candidate.create(req.body);
            res.send(candidate)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = controller;