const beautify = require("json-beautify");

class ResultHandler {
    static resolve(err, data, action, callback) {
        let result = {
            action,
            err,
            data
        };
        callback(beautify(result, null, 2, 100));
    }
}

export {
    ResultHandler
}