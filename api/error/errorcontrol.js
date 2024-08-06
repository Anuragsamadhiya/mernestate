export const errorHandler = (statuscode, msg) => {
    const error = new Error(msg);
    error.statuscode = statuscode;
    return error;
};