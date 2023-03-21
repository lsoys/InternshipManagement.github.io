const { createAPIError } = require("../errors/CustomeAPIError");
const Candidate = require("../models/Candidate") 


const controller = {
    // GET REQUESTS
    async getCandidates(req, res, next) {
        try {
            const candidates = await Candidate.find();
            res.status(200).send(candidates)
        } catch (error) {
            return next(Error(error))
        }
    },

    getInterns(req, res, next) {
        res.send("get interns");
    },

    // POST REQUESTS
    async addCandidate(req, res, next) {
        try {
            const candidate = await Candidate.create(req.body);
            res.status(200).send(candidate)
        } catch (error) {
            // createValidationError();
            // console.log(Object.keys(error.errors))
            // console.log(Object.values(error.errors))
            // console.log(error.errors.age.properties.message)
            const listErrors = Object.keys(error.errors).map((key) => {
                return error.errors[key].properties.message;
            })
            /* map, filter, reduce, forEach, for:in of */ 

            res.json(listErrors); 
            // return next(createAPIError(404, error.errors))x
        }
    }
}

module.exports = controller;