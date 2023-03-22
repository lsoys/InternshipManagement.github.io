const mongoose = require("mongoose")
const { isEmail } = require("validator")

// see range option
const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "firstName is required field"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "lastName is required field"]
    },
    age: {
        type: Number,
        trim: true,
        required: [true, "age is required field"]
    },
    mobile: {
        type: Number,
        trim: true,
        required: [true, "mobile is required field"]
    },
    alternativeMobile: {
        type: Number,
        trim: true,
        required: [true, "AlternativeMobile is required field"]
    },
    emailID: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "emailID is required field"],
        validate: [isEmail, "Please Enter Valid Email"]
    },
    github: {
        type: String,
        trim: true,
        required: [true, "github is required field"]
    },
    telegram: {
        type: String,
        trim: true,
    },
    collegeName: {
        type: String, 
        trim: true,
        required: [true, "collegeName is required field"]
    },
    currentGraduation: {
        type: String,
        trim: true,
        required: [true, "currentGraduation is required field"]
    },
    graduationYear: {
        type: String,
        trim: true,
        required: [true, "graduationYear is required field"]
    },
    resumeLink: {
        type: String,
        trim: true,
        required: [true, "resumeLink is required field"]
    },
    createDate: {
        type: String,
        default: new Date().toLocaleString(),
    }
})

module.exports = mongoose.model("candidate", candidateSchema)// Candidate MODEL