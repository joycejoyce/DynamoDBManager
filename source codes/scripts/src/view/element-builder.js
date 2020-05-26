import {CreateTableView} from "./create-table-view/create-table-view.js";
import {DeleteTableView} from "./delete-table-view.js";

function ElementBuilder() {}

ElementBuilder.init = () => {
    console.log("Enter init()");
    new CreateTableView().createElements();
    new DeleteTableView().createElements();
};

export {
    ElementBuilder
};