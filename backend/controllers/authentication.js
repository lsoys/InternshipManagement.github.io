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
        console.log(req.body);
        try {
            const user = await Users.login(req.body.username, req.body.password, res)
            if (typeof user == "string") {
                return res.status(404).json({ message: user })
            }
            try {
                const token = await createToken(user._id);

                res.cookie("jwt", token, {
                    maxAge: 1000 * 60 * 60 * 24 * process.env.JWT_EXPIRE,
                })

                // console.log(token);
                return res.status(200).send(token);
            } catch {
                return res.status(404).json({ message: "problem to create tokens" })
            }

        } catch (error) {
            return res.status(404).json({ message: "problem to get user details", error })
        }

    },
    // signup(req, res, next) {
    //     res.send("signup")
    // }
}

module.exports = controller;