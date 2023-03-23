const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    feedback: Object
})

export default mongoose.model("feedback", FeedbackSchema);