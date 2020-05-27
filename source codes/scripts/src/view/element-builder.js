import {CreateTablePageView} from "./create-table/create-table-page-view.js";
import {DeleteTablePageView} from "./delete-table/delete-table-page-view.jsx";

function ElementBuilder() {}

ElementBuilder.init = () => {
    new CreateTablePageView().createElements();
    new DeleteTablePageView().createElements();
};

export {
    ElementBuilder
};