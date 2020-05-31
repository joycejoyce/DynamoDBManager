import {DBConnection} from "./db-connection.js";

const dbApi = new DBConnection().getDBApi();

function TableModel() {}

TableModel.list = () => {
    return new Promise((resolve) => {
        const action = "list-tables";
        const params = {};
        dbApi.listTables(params, (err, data) => {
            if(err) {
                resolve([]);
            }
            else {
                resolve(data.TableNames);
            }
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

export {
    TableModel
}