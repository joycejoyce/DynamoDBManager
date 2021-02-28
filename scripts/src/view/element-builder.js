import {CreateTablePageView} from "./create-table/create-table-page-view.js";
import {DeleteTableView} from "./delete-table-view.js";
import {ManageTableItemsView} from "./manage-table-items-view.js";
import {TestElemView} from "./test-elem-view.js";

const React = require("react");
const ReactDOM = require("react-dom");

function ElementBuilder() {}

ElementBuilder.init = () => {
    new CreateTablePageView().createElements();
    
    ReactDOM.render(
        <DeleteTableView />,
        document.querySelector("#delete-table-section")
    );
    
    ReactDOM.render(
        <ManageTableItemsView />,
        document.querySelector("#main-page-3")
    );
    
    ReactDOM.render(
        <TestElemView />,
        document.querySelector("#main-page-4")
    );
};

export {
    ElementBuilder
};