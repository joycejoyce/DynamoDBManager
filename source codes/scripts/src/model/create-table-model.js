import {DBConnection} from "./db-connection.js";
import {ActionResultView} from "../view/common-components/action-result-view.js";

function CreateTableModel() {
    const dbApi = new DBConnection().getDBApi();
    
    this.createTable = (params) => {
        const action = "create-table";
        dbApi.createTable(params, (err, data) => {
            if(err) {
                console.log("has err");
                ActionResultView.showErrMsg(action, err);
                /*document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);*/
            }
            else {
                console.log("no err");
                ActionResultView.showSuccessMsg(action, data);
                /*document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);*/
            }
        });
    };
}

export {
    CreateTableModel
};