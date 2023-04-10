const User = require('../models/Users');
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
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
}

module.exports = authenticate;