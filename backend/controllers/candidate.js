const { createAPIError } = require("../errors/CustomeAPIError");
const Candidate = require("../models/Candidate");


const controller = {
    // GET REQUESTS
    async getCandidates(req, res, next) {
        try {
            const candidates = await Candidate.find({ hire: 0 });
            res.status(200).send(candidates)
        } catch (error) {
            return next(Error(error))
        }
    },
    async searchCandidates(req, res, next, hire = 0) {
        try {
            const regex = new RegExp(req.query.q || "", "i"); // "i" makes the search case-insensitive
            const candidates = await Candidate.find({
                $or: [{ fullName: regex }, { emailID: regex }],
                hire
            });
            res.status(200).send(candidates)
        } catch (error) {
            res.status(404).json({ message: "Problem", error })
        }
    },

    async getInterns(req, res, next) {
        try {
            const candidates = await Candidate.find({ hire: 1 });
            res.status(200).send(candidates)
        } catch (error) {
            return next(Error(error))
        }
    },

    // POST REQUESTS
    async addCandidate(req, res, next) {
        try {
            const candidate = await Candidate.create(req.body);
            res.status(200).json(candidate)
        } catch (error) {
            // createValidationError();
            // console.log(error)
            if (error.code == 11000) {
                res.status(404).json({ message: "EmailID Already Exists" })
            } else {
                console.log(Object.keys(error.errors))
                console.log(Object.values(error.errors))
                console.log(error.errors.age.properties.message)

                const listErrors = Object.keys(error.errors).map((key) => {
                    return error.errors[key].properties.message;
                })
                /* map, filter, reduce, forEach, for:in of */

                res.json(listErrors);
                // return next(createAPIError(404, error.errors))x
            }
        }
    },

    async candidateSelection(req, res, next) {
        let { candidateID, feedback, hire, hireDetails } = req.body;

        hire ??= 0; // sets default as 0

        if (!candidateID) {
            return res.status(404).json({ message: "candidateID and hire are required field" })
        }

        /* 
            candidateID: 640026e92700147b0ad515a4,
            feedback:{
                Communication Skills
                Collaborative Skills
                Experience
                Presentation Skills
                Problem Solving Skills
                Overall Feedback
            },
            
            hire: 0/1/-1,

            hireDetails:{ // not for rejection
                fromDate:
                toDate:
                isPaid:
                isStipend:
                amount:
            } */

        try {
            const candidate = await Candidate.findOneAndUpdate({ _id: candidateID }, { feedback, hire, hireDetails }, { new: true }) // check for getting object
            res.send(candidate);
        } catch {
            res.status(404).json({ message: "problem to find candidate" })
        }
    },
}

module.exports = controller;