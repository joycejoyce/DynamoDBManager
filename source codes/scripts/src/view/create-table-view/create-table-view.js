import {Util} from "../common-components/util.js";
import {DropdownView} from "../common-components/dropdown-view.js";
import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {KeySchemaView} from "./key-schema-view.js";
import {CreateTableController} from "../../controller/create-table-controller.js";

function CreateTableView() {
    this.createElements = () => {
        new KeySchemaView().createElements();
        new AttrCtrlItemView().createAnItem();
        createIElemForCreateTablePageBtn();
    };
    
    function createIElemForCreateTablePageBtn() {
        const createTablePageElem = document.querySelector("#create-table-page");
        const overflow = Util.getComputedPropertyValue(createTablePageElem, "overflow");
        
        let iElem;
        if(overflow == "hidden") {
            iElem = DropdownView.getFaCaretIElem("down");
        }
        else {
            iElem = DropdownView.getFaCaretIElem("up");
        }
        const createTablePageBtn = document.querySelector("#create-table-page-btn");
        createTablePageBtn.appendChild(iElem);
    }
    
    this.addEventListeners = () => {
        listenOnClickCreateTablePageBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        new KeySchemaView().addEventListeners
        listenOnSubmitCreateTableForm();
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
    
    function listenOnSubmitCreateTableForm() {
        const createTblForm = document.getElementById("create-table-form");
        createTblForm.addEventListener("submit", (e) => {
            e.preventDefault();
            createTbl();
        });
    }
    
    function createTbl() {
        new CreateTableController().transformViewInputForModel();
    }
}

export {
    CreateTableView
};