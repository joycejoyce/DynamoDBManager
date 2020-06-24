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
        dbApi.createTable(params, (err, data) => resolve({err, data}));
    });
};

TableModel.delete = (tableName) => {
    return new Promise((resolve) => {
        const params = { TableName: tableName };
        dbApi.deleteTable(params, (err, data) => resolve({err, data}));
    });
};

TableModel.describe = (params) => {
    return new Promise((resolve) => {
        dbApi.describeTable(params, (err, data) => resolve({err, data}));
    });
};

TableModel.addItems = (params) => {
    return new Promise((resolve) => {
        dbApi.batchWriteItem(params, (err, data) => resolve({err, data}));
    });
};

TableModel.query = (params) => {
    return new Promise((resolve) => {
        dbApi.query(params, (err, data) => resolve({err, data}));
    });
};

TableModel.scan = (params) => {
    return new Promise((resolve) => {
        dbApi.scan(params, (err, data) => resolve({err, data}));
    });
};

TableModel.deleteItem = (params) => {
    return new Promise((resolve) => {
        dbApi.deleteItem(params, (err, data) => resolve({err, data}));
    });
}
                    
export {
    TableModel
}