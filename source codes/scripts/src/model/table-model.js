import { DBConnection } from "./db-connection.js";
import { ResultHandler } from "./result-handler.js";

const dbApi = new DBConnection().getDBApi();

function TableModel() {}

TableModel.list = (params) => {
    return new Promise((resolve) => {
        dbApi.listTables(params, (err, data) => resolve({err, data}));
    });
};

TableModel.create = (params) => {
    return new Promise((resolve) => {
        dbApi.createTable(params, (err, data) => {
            ResultHandler.resolve(err, data, "Create Tables", resolve);
        });
    });
};

TableModel.delete = (tableName) => {
    return new Promise((resolve) => {
        const action = "delete-tables";
        const params = { TableName: tableName };
        dbApi.deleteTable(params, (err, data) => {
            if(err) {
                resolve(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

TableModel.describe = (params) => {
    return new Promise((resolve) => {
        dbApi.describeTable(params, (err, data) => resolve({err, data}));
    });
};
                    
export {
    TableModel
}