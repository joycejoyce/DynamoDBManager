import {CommonView} from "./common-view.js";
import {CreateTableView} from "./create-table-view/create-table-view.js";
import {ConfirmView} from "./confirm-view.js";

function EventListener() {
    this.addEventListeners = () => {
        new CommonView().addEventListeners();
        new CreateTableView().addEventListeners();
        new ConfirmView().addEventListeners();
    };
}

export {
    EventListener
};