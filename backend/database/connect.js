const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

module.exports = mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})