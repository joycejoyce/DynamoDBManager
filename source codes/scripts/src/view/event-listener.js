import {MainTabView} from "./main-tab-view.js";
import {CreateTablePageView} from "./create-table/create-table-page-view.js";
import {DeleteTablePageView} from "./delete-table/delete-table-page-view.jsx";
import {ConfirmView} from "./common-components/confirm-view.js";
import {DropdownView} from "./common-components/dropdown-view.js";

function EventListener() {}
EventListener.init = () => {
    new MainTabView().addEventListeners();
    new CreateTablePageView().addEventListeners();
    new DeleteTablePageView().addEventListeners();
    ConfirmView.addEventListeners();
    DropdownView.addEventListeners();
};

export {
    EventListener
};