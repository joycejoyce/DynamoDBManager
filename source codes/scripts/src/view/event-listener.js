import {MainTabView} from "./main-tab-view.js";
import {CreateTableView} from "./create-table-view/create-table-view.js";
import {DeleteTableView} from "./delete-table-view.js";
import {ConfirmView} from "./common-components/confirm-view.js";
import {DropdownView} from "./common-components/dropdown-view.js";

function EventListener() {
    this.addEventListeners = () => {
        new MainTabView().addEventListeners();
        new CreateTableView().addEventListeners();
        new DeleteTableView().addEventListeners();
        ConfirmView.addEventListeners();
        DropdownView.addEventListeners();
    };
}

export {
    EventListener
};