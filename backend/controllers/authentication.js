const controller = {
    login(req, res, next) {
        res.send("working");
    },
    signup(req, res, next) {
        res.send("signup")
    }
}

module.exports = controller;