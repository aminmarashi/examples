function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send("An error occured");
    next();
}

module.exports = {
    handleErrors,
};
