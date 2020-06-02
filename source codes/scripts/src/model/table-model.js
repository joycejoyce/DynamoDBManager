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

TableModel.describe = (tableName, describeName) => {
    return new Promise((resolve) => {
        const action = "describe-table";
        const params = { TableName: tableName };
        dbApi.describeTable(params, (err, data) => {
            if(err) {
                resolve(err);
            }
            else {
                switch (describeName) {
                    case TableModel.describeName.attributeName:
                        const attrNames = data.Table.AttributeDefinitions.map(def => def.AttributeName);
                        resolve(attrNames);
                        break;
                    default:
                        resolve();
                        break;
                }
            }
        });
    });
};
                    
TableModel.describeName = {
    attributeName: "AttributeName"
};
                    
export {
    TableModel
}