const mongoose = require("mongoose")
const { isEmail } = require("validator")

// see range option
const CandidateSchema = new mongoose.Schema({
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
    fullName: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    mobile: {
        type: Number,
        trim: true,
        required: [true, "mobile is required field"]
    },
    alternativeMobile: {
        type: Number,
        trim: true,
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
    },
    telegram: {
        type: String,
        trim: true,
    },
    collegeName: {
        type: String,
        trim: true,
    },
    currentGraduation: {
        type: String,
        trim: true,
    },
    graduationYear: {
        type: String,
        trim: true,
    },
    resumeLink: {
        type: String,
        trim: true,
        required: [true, "resumeLink is required field"]
    },
    createDate: {
        type: String,
        default: () => new Date().toLocaleString(),
    },
    feedback: {
        type: Object,
    },
    hire: {
        type: Number, // 0=no status, 1 = hired, -1 = rejected
        default: 0
    },
    hireDetails: {
        type: Object,
    },
    status: {
        type: Number,
        default: 0 // 1=upcoming, 2=ongoing, 3=completed
    }
})

CandidateSchema.pre("save", function (next) {
    this.fullName = this.firstName + " " + this.lastName;
    next();
})

module.exports = mongoose.model("candidate", CandidateSchema)// Candidate MODEL