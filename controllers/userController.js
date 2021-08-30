const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidate, loginValidate } = require("./validate");

async function register(req, res) {
    let salt = bcrypt.genSaltSync(14);

    const { error } = registerValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    //condicional para que não tenha email duplicado
    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) return res.status(400).send("Email already exists");

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

async function login(req, res) {
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    const selectedUser = await User.findOne({ email: req.body.email });
    if (!selectedUser) return res.status(400).send("Email or Password incorrect");

    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
    if (!passwordAndUserMatch) return res.status(400).send("Email or Password incorrect");

    const token = jwt.sign(
        { _id: selectedUser._id, admin: selectedUser.admin },
        process.env.TOKEN_SECRET
    );

    res.header("authorization-token", token);
    res.send("User logged");
}

module.exports = { register, login };
