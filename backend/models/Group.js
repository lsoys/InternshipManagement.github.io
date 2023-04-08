const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    interns: {
        type: Array,
        required: true
    },
    delete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("group", GroupSchema);