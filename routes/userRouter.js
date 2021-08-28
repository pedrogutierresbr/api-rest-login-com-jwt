const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/userController");

//se tratando de dados sensíveis do user, usarei apenas método POST
router.post("/register", register);

router.post("/login", login);

module.exports = router;
