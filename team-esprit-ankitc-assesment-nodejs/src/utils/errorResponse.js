const errorMessageFunction = (statusValue,dataValue,) => {
    return {
        status: statusValue,
        error: dataValue
    };
};
module.exports = errorMessageFunction