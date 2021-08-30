const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

router.get("/", auth, (req, res) => {
    if (req.user.admin) {
        res.send("Esse dado só deve ser visto pelo Admin");
    } else {
        res.status(401).send("Not Admin: Access Denied");
    }
});

router.get("/free", auth, (req, res) => {
    res.send("Esse dado só pode ser visto por usuários logados");
});

module.exports = router;
