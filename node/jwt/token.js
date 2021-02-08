const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { env } = require("process");
dotenv.config();

console.log(
    jwt.sign(
        {
            username: "amin",
            role: "admin",
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1000h" }
    )
);
