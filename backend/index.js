const express = require("express")
const app = express();

require("dotenv").config(); //check

// middlewares
app.use(express.json())
// app.use((req, res, next)=>{

// })

// routes
const candidateRouter = require("./routers/candidate");
app.use("/candidate", candidateRouter);

// custome errors

// error 404
app.use((req, res, next) =>{
    res.send("Error 404");
})

// server 
const mongoose = require("mongoose")
let DB_URI="mongodb+srv://admin:admin@cluster0.kodbf.mongodb.net/InternshipManagement?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
const connection =mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
connection.then(()=>{
    const port = process.env.PORT || 2324;

    app.listen(port, ()=>{
        console.log("http://localhost:"+port)
    });
}).catch(()=>{
    console.log("Problem to Connect with database")
})