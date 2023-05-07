// status, message
class CustomAPIError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status;
    }
}


function createAPIError(status, message) {
    return new CustomAPIError(status, message);
}

module.exports = CustomAPIError;
module.exports = {
    createAPIError
}