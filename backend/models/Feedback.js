const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    internId: String,
    name: String,
    feedback: Array
})

/* feedback: {
    candidateId:"234234",
    [LIST OF FEEDBACKS]
} */

export default mongoose.model("feedback", FeedbackSchema);