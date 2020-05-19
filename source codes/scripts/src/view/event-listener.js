import {OthersView} from "./others-view.js";
import {CreateTableView} from "./create-table-view/create-table-view.js";
import {ConfirmView} from "./confirm-view.js";
import {DropdownView} from "./common-components/dropdown-view.js";

function EventListener() {
    this.addEventListeners = () => {
        new OthersView().addEventListeners();
        new CreateTableView().addEventListeners();
        new ConfirmView().addEventListeners();
        DropdownView.addEventListeners();
    };
}

export {
    EventListener
};