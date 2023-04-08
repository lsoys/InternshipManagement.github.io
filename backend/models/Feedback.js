const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    internID: String,
    feedback: Array
})

/* feedback: {
    {
        dateTime,
        feedbackMessage
    }
} */

module.exports = mongoose.model("feedback", FeedbackSchema);