const Work = require("../models/Work")

const controller = {
    async getWorks(req, res, next) {
        try {
            const works = await Work.find();
            res.status(200).json(works);
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error.message })
        }
    },

    async addWork(req, res, next) {
        try {
            const { title, assignTo, priority, deadline, description } = req.body;
            if (title && assignTo.length && deadline && description) {
                const work = await Work.create({ title, assignTo, priority, deadline, description })
                res.status(201).json(work);
            } else {
                console.log("requested")
                res.status(404).json({ message: "{title, assignTo, priority, deadline, description} are required fields" })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "Please Ensure sending correct details", error: error.message })
        }
    }
}

module.exports = controller;