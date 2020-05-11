import {CommonView} from "./common-view.js";
import {CreateTableView} from "./create-table-view.js";

function EventListener() {
    this.addEventListeners = () => {
        new CommonView().addEventListeners();
        new CreateTableView().addEventListeners();
    };
}

export {
    EventListener
};