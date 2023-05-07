const User = require('../models/Users');
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authentication.split(" ").reverse()[0];
        if (!token) {
            // res.redirect('/login');
            // console.log("invalid token")
            res.status(404).json({ status: 404, message: "token is not valid" })
            return;
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY, (err, value) => {
            if (err) {
                // res.redirect('/login');
                res.status(404).json({ status: 404, message: "token is not valid" })
                return;
            }

            next();
        });
        // req.user=await User.findById(verify.id);
    } catch (error) {
        if (error instanceof TypeError) {
            res.status(404).send({ message: "please provide Authentication:'bearer token' in headers" })
        } else {
            console.log("error at authentication.js: ");
            res.status(502).send({ message: "unexpected error at server" })
        }
    }
}

module.exports = authenticate;