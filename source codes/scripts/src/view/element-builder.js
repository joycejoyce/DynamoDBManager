import {CreateTableView} from "./create-table-view/create-table-view.js";

function ElementBuilder() {}

ElementBuilder.init = () => {
    new CreateTableView().createElements();
};

export {
    ElementBuilder
};