import {DBConnection} from "./db-connection.js";

const docClient = new DBConnection().getDBApi().DocumentClient();

function TableItemModel() {}

TableItemModel.query(params) {
    return new Promise((resolve) => {
        docClient.query(params, (err, data) => {
            if(err) {
                resolve(`Failed to query table "${params.TableName}"\n${JSON.stringify(err, undefined, 2)}`);
            }
            else {
                resolve(data);
            }
        });
    });
}

export {
    TableItemModel
}