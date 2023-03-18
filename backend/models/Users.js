const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "username is required field"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required field"]
    }
})

module.exports = mongoose.model("user", UserSchema)