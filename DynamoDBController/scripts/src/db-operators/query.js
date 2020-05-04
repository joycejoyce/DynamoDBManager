import {DBSetter} from "../tools/db-setter.js";

function Query() {
    let dynamoDB = new DBSetter().getDynamoDB();
    
    this.getAllTblNames = () => {
        const params = {};
        const tblNames = dynamoDB.listTables(params, () => {
            if(err) {
                console.log(JSON.stringify(err, undefined, 2));
            }
            else {
                console.log("listTables() success");
            }
        });
        console.log("tblNames");
    };
}


export {
    Query
};