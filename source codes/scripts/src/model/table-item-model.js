import {DBConnection} from "./db-connection.js";

const beautify = require("json-beautify");
const dbApi = new DBConnection().getDBApi();

function TableItemModel() {}

TableItemModel.addItems = (params) => {
    return new Promise((resolve) => {
        dbApi.batchWriteItem(params, (err, data) => {
            const commonStr = `create items for table "${Object.keys(params.RequestItems)[0]}":\n`;
            if(err) {
                resolve(`Failed to ${commonStr}${beautify(err, null, 2, 100)}\nparams: ${beautify(params, null, 2, 100)}`);
            }
            else {        
                resolve(`Successfully ${commonStr} ${beautify(data, null, 2, 100)}\nparams: ${beautify(params, null, 2, 100)}`,);
            }
        });
    });
};

TableItemModel.query = (params) => {
    return new Promise((resolve) => {
        console.log("params", beautify(params, null, 2, 100));
        dbApi.query(params, (err, data) => {
            const commonStr = `query items for table "${params.TableName}":\n`;
            if(err) {
                resolve(`Failed to ${commonStr}${beautify(err, null, 2, 100)}\nparams: ${beautify(params, null, 2, 100)}`);
            }
            else {        
                resolve(`Successfully ${commonStr} ${beautify(data, null, 2, 100)}`);
            }
        });
    });
};

export {
    TableItemModel
}