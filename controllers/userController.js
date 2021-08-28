function register(req, res) {
    console.log("register");
    res.send("Register");
}

function login(req, res) {
    console.log("login");
    res.send("Login");
}

module.exports = { register, login };
