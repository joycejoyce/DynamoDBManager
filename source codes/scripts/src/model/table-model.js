import {DBConnection} from "./db-connection.js";

const beautify = require("json-beautify");
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

TableModel.create = (params) => {
    return new Promise((resolve) => {
        const action = "create-tables";
        dbApi.createTable(params, (err, data) => {
            const commonStr = `create table "${params.TableName}:\n`;
            if(err) {
                resolve(`Fail to create table ${commonStr}${beautify(err, null, 2, 100)}`);
            }
            else {
                resolve(`Successfully ${commonStr}${beautify(data, null, 2, 100)}`);
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
                    case TableModel.describeName.attrDef:
                        resolve(data.Table.AttributeDefinitions);
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
    attrDef: "AttributeDefinitions",
    attrName: "AttributeName",
    attrType: "AttributeType"
};
                    
export {
    TableModel
}