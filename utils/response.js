module.exports = (data=undefined, status = 200, message=undefined) => {
    return {
        serverDate: new Date(),
        statusCode: status,
        data: data,
        message: message
    };
};
