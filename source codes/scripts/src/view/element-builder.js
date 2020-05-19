import {CreateTableView} from "./create-table-view/create-table-view.js";
import {AttrCtrlItemView} from "./create-table-view/attr-ctrl-item-view.js";

ElementBuilder.init = () => {
    return new Promise((resolve) => {
        CreateTableView.createKeySchemaElements();
        AttrCtrlItemView.createAnItem();
        resolve();
    });
};

export {
    ElementBuilder
};