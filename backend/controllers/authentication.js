const Users = require("../models/Users");
const jwt = require("jsonwebtoken")

async function createToken(id) {
    const token = await jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token;
}

const controller = {
    async login(req, res, next) {
        const user = await Users.login(req.body.username, req.body.password, res)
        const token = await createToken(user._id);
        res.cookie("jwt", token, {
            maxAge: 1000 * 60 * 60 * 24 * 2
        })
        res.send(token);
    },
    signup(req, res, next) {
        res.send("signup")
    }
}

module.exports = controller;