import {DBConnection} from "../tools/db-connection.js";
import {DB_PROPERTY} from "../constants/db-info.js";

function Query() {
    let dynamoDB = new DBConnection().getDynamoDB();
    
    this.getAllTblNames = () => {
        return new Promise((resolve) => {
            const params = {};
            dynamoDB.listTables(params, (err, data) => {
                if(err) {
                    throw `listTables() failed! err: ${err.stack}`;
                }
                else {
                    resolve(data[DB_PROPERTY.TableNames]);
                }
            });
        });
    };
}


export {
    Query
};