const Group = require("../models/Group")

const controller = {
    async getGroups(req, res, next) {
        const groups = await Group.find({ delete: false });
        res.status(200).json(groups)
    },

    async searchGroups(req, res, next, exists = true) {
        try {
            let q = req.query.q.split("(").join("\\(");
            q = q.split(")").join("\\)");

            const regex = new RegExp(q || "", "i"); // "i" makes the search case-insensitive
            const candidates = await Group.find({
                $or: [{ groupName: regex }, { createDate: regex }],
                delete: !exists
            });
            res.status(200).send(candidates)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Problem", error })
        }
    },

    async addGroup(req, res, next) {
        try {
            const { groupName, members } = req.body;
            if (groupName && members) {
                const group = await Group.create({ groupName, members });
                res.status(201).json(group)
            } else {
                res.status(404).json("groupName and members[interns/groups] are required fields")
            }
        } catch (error) {
            console.log(error)
            res.status(404).json(error?.message)
        }
    },

    async deleteGroup(req, res, next) {
        const { groupID: _id } = req.body;
        if (_id) {
            const group = await Group.updateOne({ _id }, { delete: true });
            res.status(201).json(group)

        } else {
            res.status(404).json("groupID is required fields")
        }
    },
}

module.exports = controller;