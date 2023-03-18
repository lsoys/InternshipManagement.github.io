const Users = require("../models/Users");

const controller = {
    async login(req, res, next) {
        res.send(await Users.find());
    },
    signup(req, res, next) {
        res.send("signup")
    }
}

module.exports = controller;