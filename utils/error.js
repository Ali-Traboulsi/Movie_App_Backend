module.exports = (status, message) => {
    let error;
    error = {
        statusCode: status,
        message: message,
    };

    return error;
};

