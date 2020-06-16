import { DBConnection } from "./db-connection.js";
import { ResultHandler } from "./result-handler.js";

const beautify = require("json-beautify");
const dbApi = new DBConnection().getDBApi();

function TableItemModel() {}

TableItemModel.addItems = (params) => {
    return new Promise((resolve) => {
        dbApi.batchWriteItem(params, (err, data) => resolve({err, data}));
    });
};

TableItemModel.query = (params) => {
    return new Promise((resolve) => {
        dbApi.query(params, (err, data) => resolve({err, data}));
    });
};

TableItemModel.scan = (params) => {
    return new Promise((resolve) => {
        dbApi.scan(params, (err, data) => resolve({err, data}));
    });
}

export {
    TableItemModel
}