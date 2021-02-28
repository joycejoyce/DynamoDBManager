import {DBConnection} from "./db-connection.js";
import {ActionResultView} from "../view/common-components/action-result-view.js";

function CreateTableModel() {
    const dbApi = new DBConnection().getDBApi();
    
    this.createTable = (params) => {
        const action = "create-table";
        dbApi.createTable(params, (err, data) => {
            if(err) {
                ActionResultView.showErrMsg(action, err);
            }
            else {
                ActionResultView.showSuccessMsg(action, data);
            }
        });
    };
}

export {
    CreateTableModel
};