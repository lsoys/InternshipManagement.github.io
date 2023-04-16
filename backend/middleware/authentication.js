const User = require('../models/Users');
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authentication.split(" ")[1];
        if (!token) {
            // res.redirect('/login');
            // console.log("invalid token")
            res.status(404).json({ status: 404, msg: "token is not valid" })
            return;
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY, (err, value) => {
            if (err) {
                // res.redirect('/login');
                res.status(404).json({ status: 404, msg: "token is not valid" })
                return;
            }

            next();
        });
        // req.user=await User.findById(verify.id);
    } catch (error) {
        console.log("error at authentication.js: ", error);
        res.status(404).send(error)
    }
}

module.exports = authenticate;