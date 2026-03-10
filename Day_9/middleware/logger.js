const loggerMiddleware = (req, res, next) => {

    const requestTime = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`Time: ${requestTime} | Method: ${method} | URL: ${url}`);

    next();
};

module.exports = loggerMiddleware;
