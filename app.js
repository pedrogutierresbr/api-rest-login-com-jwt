require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginJwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Houve um erro"));
db.once("open", () => console.log("Banco carregado"));

app.use("/user", express.json(), userRouter);

app.use("/admin", express.json(), adminRouter);

app.listen(process.env.PORT, () => {
    console.log("Servidor inicializado");
});
