const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    internID: {
        type:String,
        trim: true,
        required: [true, "internID is required field"]
    },
    feedbacks: [{
        feedback: String,
        createDate: {
            type: String,
            default: new Date().toLocaleString(),
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