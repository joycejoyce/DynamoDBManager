import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {DropdownView} from "../common-components/dropdown-view.js";

function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTableBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        listenOnClickHashKeyBtn();
    };
    
    function listenOnClickCreateTableBtn() {
        const elem = document.getElementById("create-table-btn");
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
            addAnAttributeControlItem(elem);
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function addAnAttributeControlItem() {
        const attrDefElem = document.getElementById("attribute-definitions");
        const attrCtrlItem = new AttrCtrlItemView().getDoc();
        attrDefElem.appendChild(attrCtrlItem);
    }
    
    function listenOnClickHashKeyBtn() {
        const hashKeyBtn = document.getElementById("hash-key-btn");
        hashKeyBtn.addEventListener("click", () => showOrHideHashKeyList());
    }
    
    function showOrHideHashKeyList() {
        const attrs = getAttrs();
        setHashKeyListDoc(attrs);
        
        /*const hashKeyList = document.getElementById("hash-key-list");
        const display = hashKeyList.style.display;
        if(display == "block") {
            hashKeyList.style.display = "none";
        }
        else {
            hashKeyList.style.display = "block";
        }*/
    }
    
    function getAttrs() {
        const elems = document.getElementsByClassName("attribute-name-input");
        console.log("elems # = " + elems.length);
        const attrs = Array.from(document.getElementsByClassName("attribute-name-input")).forEach(elem => elem.value);
        
        return attrs;
    }
    
    function setHashKeyListDoc(attrs) {
        const dropdown = new DropdownView();
        dropdown.setList(attrs);
        const listDoc = dropdown.getList();
        document.getElementById("hash-key-list").innerHTML = listDoc.innerHTML;
        console.log(`document.getElementById("hash-key-list").innerHTML`);
    }
}

export {
    CreateTableView
};