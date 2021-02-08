const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function isAuthorized(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            console.error(error);
            res.sendStatus(403);
        }
        req.user = {
            username: payload.username,
            role: payload.role,
        };
        next();
    });
}

module.exports = {
    isAuthorized,
};
