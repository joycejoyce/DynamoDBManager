import {DropdownView} from "../common-components/dropdown-view.js";
import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";

let itemNum = 0;

function AttrCtrlItemView() {
    this.createAnItem = () => {
        const itemTbl = document.querySelector("#attr-ctrl-item-tbl");
        const id = "item" + itemNum.toString();
        itemTbl.appendChild(getAttrCtrlItemDoc(id));
        addEventListeners(itemTbl.querySelector("#"+id));
        itemNum ++;
    };

    function getAttrCtrlItemDoc(id) {
        const tblRow = document.createElement("tr");
        tblRow.className = "attr-ctrl-item";
        tblRow.id = id;

        const deleteBtn = getAttrCtrlItemDeleteBtn();
        const td1 = document.createElement("td");
        td1.appendChild(deleteBtn);
        tblRow.appendChild(td1);

        const typeDropdown = getAttrTypeDropdown();
        const td2 = document.createElement("td");
        td2.appendChild(typeDropdown);
        tblRow.appendChild(td2);

        const attrNameInput = getAttrNameInput();
        const td3 = document.createElement("td");
        td3.appendChild(attrNameInput);
        tblRow.appendChild(td3);

        return tblRow;
    }

    function getAttrCtrlItemDeleteBtn(attrCtrlItem) {
        const btn = document.createElement("img");
        btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
        btn.className = "delete-attr-ctrl-item-btn";
        return btn;
    }

    function getAttrTypeDropdown() {
        const dropdown = DropdownView.getDropdownDoc();

        return dropdown;
    }

    function getAttrNameInput() {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.required = true;
        input.className = "attr-name-input";
        return input;
    }

    function addEventListeners(attrCtrlItemElem) {
        listenOnClickDeleteBtn(attrCtrlItemElem);
        listenOnClickAttrTypeBtn(attrCtrlItemElem);
    }

    function listenOnClickDeleteBtn(attrCtrlItemElem) {
        const deleteBtn = attrCtrlItemElem.querySelector(".delete-attr-ctrl-item-btn");
        deleteBtn.addEventListener("click", () => {
            attrCtrlItemElem.remove();
            const num = document.querySelectorAll(".attr-ctrl-item").length;
            if(num == 0) {
                DeleteAllAttrBtnView.disableBtn();
                AttrCtrlItemView.createAnItem();
            }
        });
    }

    function listenOnClickAttrTypeBtn(attrCtrlItemElem) {
        DropdownView.listenOnClickDropdownBtn(attrCtrlItemElem, () => Object.values(ATTR_TYPES), "Attribute types are not defined");
    }
}

const ATTR_TYPES = {
    string: "string",
    number: "number",
    boolean: "boolean"
};

export {
    AttrCtrlItemView,
    ATTR_TYPES
};