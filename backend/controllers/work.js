const Work = require("../models/Work")

const controller = {
    async getWorks(req, res, next) {
        try {
            const works = await Work.find();
            res.status(200).json({ works });
        } catch (error) {
            console.log(error)
            res.status(404).json({ error })
        }
    },

    async addWork(req, res, next) {
        const { title, assignTo, priority, deadline, description } = req.body;
        if (title && assignTo.length && priority && deadline && description) {
            const work = await Work.create({ title, assignTo, priority, deadline, description })
            res.status(201).json({ work });
        } else {
            res.status(404).send("{title, assignTo, priority, deadline, description} are required fields")
        }
    }
}

module.exports = controller;