const Users = require("../models/Users");
const jwt = require("jsonwebtoken")

async function createToken(id) {
    const token = await jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: (Number.parseInt(process.env.JWT_EXPIRE) || 2) + "d"
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
                    maxAge: 1000 * 60 * 60 * 24 * (Number.parseInt(process.env.JWT_EXPIRE) || 2), // default 2 days
                })

                // console.log(token);
                return res.status(200).send(token);
            } catch (error) {
                console.log(error)
                return res.status(404).json({ message: "problem to create tokens" })
            }

        } catch (error) {
            return res.status(404).json({ message: "problem to get user details", error })
        }
    },

    async checkVerify(req, res, next) {
        res.status(200).json({ message: "OK" })
    }
    // signup(req, res, next) {
    //     res.send("signup")
    // }
}

module.exports = controller;