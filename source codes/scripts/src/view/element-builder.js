import {CreateTableView} from "./create-table-view/create-table-view.js";
import {AttrCtrlItemView} from "./create-table-view/attr-ctrl-item-view.js";

function ElementBuilder() {}

ElementBuilder.init = () => {
    new CreateTableView().createElements();
};

export {
    ElementBuilder
};