import {MainTabView} from "./main-tab-view.js";
import {CreateTablePageView} from "./create-table/create-table-page-view.js";
import {DeleteTableView} from "./delete-table-view.js";
import {ConfirmView} from "./common-components/confirm-view.js";
import {DropdownView} from "./common-components/dropdown-view.js";

function EventListener() {}
EventListener.init = () => {
    new MainTabView().addEventListeners();
    new CreateTablePageView().addEventListeners();
    ConfirmView.addEventListeners();
    DropdownView.addEventListeners();
};

export {
    EventListener
};