const express = require("express")
const app = express();
require("dotenv").config();

// MIDDLEWARE
app.use(express.json());

// ROUTES
const candidateRouter = require("./routers/candidate")
app.use("/candidate", candidateRouter);

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