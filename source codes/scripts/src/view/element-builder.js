import {DropdownView} from "./common-components/dropdown-view.js";
import {AttrCtrlItemView} from "./create-table-view/attr-ctrl-item-view.js";

function ElementBuilder() {
    this.init = () => {
        new DropdownView().createElements();
        new AttrCtrlItemView().createAnItem();
    };
}

export {
    ElementBuilder
};