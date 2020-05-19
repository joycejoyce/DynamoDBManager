import {Util} from "../common-components/util.js";
import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {KeySchemaView} from "./key-schema-view.js";
import {CreateTableController} from "../../controller/create-table-controller.js";

function CreateTableView() {
    this.createElements = () => {
        new KeySchemaView().createElements();
        new AttrCtrlItemView().createAnItem();
    };
    
    this.addEventListeners = () => {
        listenOnClickCreateTablePageBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        new KeySchemaView().addEventListeners();
        listenOnCreateTblBtn();
    };
    
    function listenOnClickCreateTablePageBtn() {
        const elem = document.getElementById("create-table-page-btn");
        elem.addEventListener("click", (e) => {
            showOrHideCreateTableForm(e.target);
            toggleFaCaretUpAndDown(e.target.querySelector("i"));
        });
    }
    
    function showOrHideCreateTableForm(elem) {
        const page = document.querySelector("#create-table-page");
        const overflow = Util.getComputedPropertyValue(page, "overflow");
        if(overflow == "hidden") {
            page.style.maxHeight = page.scrollHeight + "px";
            page.style.overflow = "visible";
        }
        else {
            page.style.maxHeight = null;
            page.style.overflow = "hidden";
        }
    }
    
    function toggleFaCaretUpAndDown(elem) {
        const classes = elem.classList;
        const upClass = "fa-caret-up";
        const downClass = "fa-caret-down";
        if(classes.contains(downClass)) {
            elem.classList.remove(downClass);
            elem.classList.add(upClass);
        }
        else if(classes.contains(upClass)) {
            elem.classList.remove(upClass);
            elem.classList.add(downClass);
        }
    }
    
    function listenOnClickAddAttributeBtn() {
        const elem = document.getElementById("add-attr-ctrl-item-btn");
        elem.addEventListener("click", () => {
            enableDeleteAllAttributesBtn();
            new AttrCtrlItemView().createAnItem();
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function listenOnCreateTblBtn() {
        const createTblBtn = document.getElementById("create-tbl-btn");
        createTblBtn.addEventListener("click", () => {
            createTbl();
        });
    }
    
    function createTbl() {
        new CreateTableController().transformViewInputForModel();
    }
}

/*CreateTableView.createKeySchemaElements = () => {
    createHashKeyDropdownElem();
    createRangeKeyDropdownElem();
};

function createHashKeyDropdownElem() {
    const dropdownDoc = DropdownView.getDropdownDoc();
    const elem = document.querySelectorAll("#hash-key-row>td")[1];
    elem.append(dropdownDoc);
}

function createRangeKeyDropdownElem() {
    const dropdownDoc = DropdownView.getDropdownDoc();
    const elem = document.querySelectorAll("#range-key-row>td")[1];
    .append(dropdownDoc);
}*/

export {
    CreateTableView
};