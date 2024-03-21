const testMiddleWare = (req, res, next) => {
    console.log(req);
    next();
}

module.exports = testMiddleWare;