const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    internID: {
        type: String,
        trim: true,
        required: [true, "internID is required field"]
    },
    feedbacks: [{
        feedback: {
            type: String,
            trim: true,
        },
        createDate: {
            type: String,
            default: () => new Date().toLocaleString(),
        }
    }]
})

/* feedback: {
    {
        dateTime,
        feedbackMessage
    }
} */

module.exports = mongoose.model("feedback", FeedbackSchema);