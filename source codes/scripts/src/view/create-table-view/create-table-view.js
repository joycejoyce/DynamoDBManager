import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {DropdownView} from "../common-components/dropdown-view.js";
import {CommonFunctions} from "../common-components/common-functions.js";
import {CreateTableController} from "../../controller/create-table-controller.js";

function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTablePageBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        listenOnDropdownBtn();
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
            new AttrCtrlItemView().createAnItem();
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function listenOnDropdownBtn() {
        listenOnClickHashKeyBtn();
        listenOnClickRangeKeyBtn();
    }
    
    function listenOnClickHashKeyBtn() {
        const hashKeyBtn = document.querySelector("#hash-key-dropdown>.dropdown-btn");
        hashKeyBtn.addEventListener("click", () => {
            const id = "hash-key-dropdown";
            showOrHideAttrNameList(id);
            listenOnClickAttrNameListItems(id);
        });
    }
    
    function showOrHideAttrNameList(id) {
        createAttrNameDropdownList(id);
        const dropdownListElem = getDropdownListElem(id);
        new CommonFunctions().showOrHideElement(dropdownListElem);
    }
    
    function createAttrNameDropdownList(id) {
        const dropdownListElem = getDropdownListElem(id);
        try {
            const attrNames = getAttrNames();
            new DropdownView().createListItemElems(dropdownListElem, attrNames);
        } catch(e) {
            alert(e);
        }
    }
    
    function getDropdownListElem(id) {
        return document.querySelector("#" + id + ">.dropdown-list");
    }
    
    function getAttrNames() {
        const attrNameInputs = document.getElementsByClassName("attribute-name-input");
        
        let attrNames = Array.from(attrNameInputs)
            .map(input => input.value)
            .filter(name => name.length > 0);
        attrNames = new CommonFunctions().getDistinctValues(attrNames);
        
        if(attrNames.length == 0) {
            throw "No attributes. Please add attribute definitions first.";
        }
        
        return attrNames;
    }
    
    function listenOnClickAttrNameListItems(id) {
        const itemElems = Array.from(getDropdownListElem(id).querySelectorAll("a"));
        
        itemElems.forEach(elem => {
            elem.addEventListener("click", (e) => {
                const dropdownView = new DropdownView();
                const dropdownElem = getDropdownElem(id);
                dropdownView.changeBtnTextAndHideList(e.target.textContent, dropdownElem);
            });
        });
    }
    
    function getDropdownElem(id) {
        return document.getElementById(id);
    }
    
    function listenOnClickRangeKeyBtn() {
        const rangeKeyBtn = document.querySelector("#range-key-dropdown>.dropdown-btn");
        rangeKeyBtn.addEventListener("click", () => {
            const id = "range-key-dropdown";
            showOrHideAttrNameList(id);
            listenOnClickAttrNameListItems(id);
        });
    }
    
    function listenOnCreateTblBtn() {
        const createTblBtn = document.getElementById("create-tbl-btn");
        createTblBtn.addEventListener("click", createTbl);
    }
    
    function createTbl() {
        new CreateTableController().transformViewInputForModel();
    }
}

export {
    CreateTableView
};