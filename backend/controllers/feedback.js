const Feedback = require("../models/Feedback");

const controller = {
    async getFeedback(req, res, next) {
        const { internID } = req.query;
        if (internID) {
            let feedbacks = await Feedback.findOne({ internID })
            feedbacks ||= { message: "no feedbacks" };
            return res.status(200).send(feedbacks)
        } else {
            return res.status(404).json({ message: "internID is required field" })
        }
    },

    async addFeedback(req, res, next) {
        const { internID, feedback } = req.body;

        if (internID) {
            const feedbackExistence = await Feedback.findOne({ internID })
            if (feedbackExistence) { // present, update it
                const newFeedback = await Feedback.findOneAndUpdate(
                    { internID }, // Filter for the document to update
                    { $push: { feedbacks: { feedback } } }, // Data to append
                    { new: true }
                )
                return res.json(newFeedback);
            } else {  // not present, create it
                const newFeedback = await Feedback.create({ internID, feedbacks: [{ feedback }] })
                return res.status(201).json(newFeedback);
            }
        } else {
            return res.status(404).json({ message: "internID and feedback are required field" })
        }
    }
}

module.exports = controller;