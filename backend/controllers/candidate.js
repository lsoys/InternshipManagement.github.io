
const controller = {
    getCandidates(req, res, next){
        res.send("Get Candidates")
    },

    createCandidate(req, res, next) {
        res.send("Create Candidate")
    }
}

module.exports = controller