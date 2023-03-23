const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    interns: {
        type: Array,
        required: true
    }
})

export default mongoose.model("group", GroupSchema);