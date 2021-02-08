const express = require("express");
const { isAuthorized } = require("./auth");
const { handleErrors } = require("./error");
const app = express();
const port = 8080;

app.use(handleErrors);
app.get("/status", isAuthorized, (req, res) => {
    const localTime = new Date().toLocaleTimeString();
    res.status(200).send(`Hello: ${req.user.username}! Server time is ${localTime}`);
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
