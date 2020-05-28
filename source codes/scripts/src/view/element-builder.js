import {CreateTablePageView} from "./create-table/create-table-page-view.js";
//import {DeleteTablePageView} from "./delete-table/delete-table-page-view.jsx";
import {DeleteTableView} from "./delete-table-view.js";

const React = require("react");
const ReactDOM = require("react-dom");

function ElementBuilder() {}

ElementBuilder.init = () => {
    new CreateTablePageView().createElements();
    //new DeleteTablePageView().createElements();
    ReactDOM.render(
        <DeleteTableView />,
        document.getElementById('delete-table')
    );

};

export {
    ElementBuilder
};