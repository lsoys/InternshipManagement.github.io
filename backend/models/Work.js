const mongoose = require("mongoose")

const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    priority: { // 1, 2, 3, 4, 5
        type: Number,
        default: 5
    },
    status: {
        type: Number, // 1=completed, 0=pending
        default: 0,
    },
    assignTo: [{
        _id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }],
    deadline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createDate: {
        type: String,
        default: () => new Date().toLocaleString(),
    },
})

module.exports = mongoose.model("work", WorkSchema)