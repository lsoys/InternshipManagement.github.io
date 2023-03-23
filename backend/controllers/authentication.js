const Users = require("../models/Users");
const jwt = require("jsonwebtoken")

async function createToken(id) {
    const token = await jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE + "d"
    })
    return token;
}

const controller = {
    async login(req, res, next) {
        try {
            const user = await Users.login(req.body.username, req.body.password, res)
        } catch (error) {
            res.status(404).json({ message: "problem to get user details" })
            return;
        }

        try {
            const token = await createToken(user._id);

            res.cookie("jwt", token, {
                maxAge: 1000 * 60 * 60 * 24 * process.env.JWT_EXPIRE
            })

            res.send(token);
        } catch {
            res.status(404).json({ message: "problem to create tokens" })
            return;
        }

    },
    // signup(req, res, next) {
    //     res.send("signup")
    // }
}

module.exports = controller;