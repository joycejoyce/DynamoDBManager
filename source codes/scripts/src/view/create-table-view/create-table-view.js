import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {DropdownView} from "../common-components/dropdown-view.js";
import {CreateTableController} from "../../controller/create-table-controller.js";

function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTablePageBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        listenOnDropdownButtons();
        listenOnCreateTblBtn();
    };
    
    function listenOnClickCreateTablePageBtn() {
        const elem = document.getElementById("create-table-page-btn");
        elem.addEventListener("click", () => toggleCreateTablePage(elem));
    }
    
    function toggleCreateTablePage(elem) {
        const faCaretElem = elem.querySelector("i");
        toggleFaCaretUpAndDown(faCaretElem);
        
        const page = elem.nextElementSibling;
        if(page.style.maxHeight) { //not zero, not empty string, not null
            page.style.maxHeight = null;
            page.style.overflow = "hidden";
        }
        else {
            page.style.maxHeight = page.scrollHeight + "px";
            page.style.overflow = "visible";
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
            AttrCtrlItemView.createAnItem();
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function listenOnDropdownButtons() {
        console.log("Enter listenOnDropdownButtons()");
        listenOnClickDropdownBtn("hash-key-row");
        listenOnClickDropdownBtn("range-key-row");
    }
    
    function listenOnClickDropdownBtn(id) {
        console.log("Enter listenOnClickDropdownBtn()");
        const dropdownElem = document.querySelector("#" + id + " .dropdown");
        DropdownView.listenOnClickDropdownBtn(dropdownElem, getAttrNames, "No attributes defined. Please add attributes first.");
        console.log("Exit listenOnClickDropdownBtn()");
    }
    
    function getAttrNames() {
        const attrNameInputs = document.getElementsByClassName("attr-name-input");
        
        const attrNames = Array.from(attrNameInputs)
            .map(input => input.value)
            .filter(name => name.length > 0);
        
        return attrNames;
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

CreateTableView.createKeySchemaElements = () => {
    createHashKeyDropdownElem();
    createRangeKeyDropdownElem();
};

function createHashKeyDropdownElem() {
    console.log("Enter createHashKeyDropdownElem()");
    const dropdownDoc = DropdownView.getDropdownDoc();
    const elem = document.querySelectorAll("#hash-key-row>td")[1];
    elem.append(dropdownDoc);
    console.log("Exit createHashKeyDropdownElem()");
}

function createRangeKeyDropdownElem() {
    const dropdownDoc = DropdownView.getDropdownDoc();
    const elem = document.querySelectorAll("#range-key-row>td")[1];
    elem.append(dropdownDoc);
}

export {
    CreateTableView
};