exports.errorHandler = async (err, req, res, next) => {
    console.error(err);

     return res.status(err.statusCode).json({
        error: {
            status: err.statusCode || 500,
            message: err.message || "Internal Server Occurred!"
        }
    });
};