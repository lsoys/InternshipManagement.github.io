const express = require("express")
const app = express();
const cookieParser = require('cookie-parser')
require("dotenv").config();

// MIDDLEWARE
app.use(express.json());

app.use(cookieParser());

// ROUTES
const candidateRouter = require("./routers/candidate")
const feedbackRouter = require("./routers/feedback")
const groupRouter = require("./routers/group")

app.use("/candidate", candidateRouter);
app.use("/feedback", feedbackRouter);
app.use("/group", groupRouter);

const authenticationRouter = require("./routers/authentication")
app.use("/authentication", authenticationRouter)

// ERRORs
app.use((req, res, next) => {
    res.send("ERROR 404");
})

// ERROR HANDLERS
app.use((error, req, res, next) => {
    res.status(error.status ?? 404).send({ status: error.status ?? 404, error: error.message });
});

// SERVER
const port = process.env.PORT ?? 2324;
const databaseConnection = require("./database/connect")
databaseConnection.then(() => {
    app.listen(port, () => {
        console.log("http://localhost:" + port);
    })
}).catch((error) => {
    console.log("Problem TO Connect With Database")
})