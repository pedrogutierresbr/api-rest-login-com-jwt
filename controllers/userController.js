const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
    let salt = bcrypt.genSaltSync(14);

    //condicional para que não tenha email duplicado
    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) return res.status(400).send("Email já utilizado");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        console.log(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

function login(req, res) {
    console.log("login");
    res.send("Login");
}

module.exports = { register, login };
