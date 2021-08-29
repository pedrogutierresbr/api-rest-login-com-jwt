const User = require("../models/User");

async function register(req, res) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

function login(req, res) {
    console.log("login");
    res.send("Login");
}

module.exports = { register, login };
