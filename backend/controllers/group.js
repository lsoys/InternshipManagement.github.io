const Group = require("../models/Group")

const controller = {
    async getGroups(req, res, next) {
        const groups = await Group.find({ delete: false });
        res.status(200).json(groups)
    },

    async addGroup(req, res, next) {
        const { groupName, interns } = req.body;
        if (groupName && interns) {
            const group = await Group.create({ groupName, interns });
            res.status(201).json(group)
        } else {
            res.status(404).json("groupName and interns are required fields")
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