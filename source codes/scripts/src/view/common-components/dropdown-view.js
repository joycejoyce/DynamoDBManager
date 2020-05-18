import {CommonFunctions} from "../common-components/common-functions.js";

function DropdownView() {
    this.createElements = () => {
        createHashKeyDropdownElem();
        createRangeKeyDropdownElem();
    };
    
    function createHashKeyDropdownElem() {
        const parent = document.querySelectorAll("#hash-key-row>td")[1];
        const id = "hash-key-dropdown";
        createDropdownInDoc(parent, id);
    }
    
    function createDropdownInDoc(parent, id) {
        const dropdownDoc = new DropdownView().getDropdownDoc();
        dropdownDoc.id = id;
        parent.appendChild(dropdownDoc);
    }
    
    this.getDropdownDoc = () => {
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
        const dropdownBtn = getDropdownBtn();
        dropdown.appendChild(dropdownBtn);
        
        const dropdownList = getDropdownList();
        dropdown.appendChild(dropdownList);
        
        return dropdown;
    };
    
    function getDropdownBtn() {
        const dropdownBtn = document.createElement("button");
        dropdownBtn.className = "dropdown-btn";
        
        const iElem = getFaCaretDownIElem();
        dropdownBtn.appendChild(iElem);
        
        return dropdownBtn;
    }
    
    function getFaCaretDownIElem() {
        const elem = document.createElement("i");
        elem.className = "fa fa-caret-down";
        return elem;
    }
    
    function getDropdownList() {
        const dropdownList = document.createElement("div");
        dropdownList.className = "dropdown-list";
        
        return dropdownList;
    }
    
    this.createListItemElems = (dropdownListElem, listItems) => {
        dropdownListElem.innerHTML = "";
        listItems.forEach(item => {
            const elem = document.createElement("a");
            elem.textContent = item;
            dropdownListElem.appendChild(elem);
        });
    };
    
    this.changeBtnTextAndHideList = (text, dropdownElem) => {
        changeBtnText(text, dropdownElem);
        hideList(dropdownElem);
    };
    
    function changeBtnText(text, dropdownElem) {
        const btnElem = dropdownElem.querySelector(".dropdown-btn");
        btnElem.textContent = text;
    }
    
    function hideList(dropdownElem) {
        const listElem = dropdownElem.querySelector(".dropdown-list");
        listElem.style.display = "none";
    }
    
    function createRangeKeyDropdownElem() {
        const parent = document.querySelectorAll("#range-key-row>td")[1];
        const id = "range-key-dropdown";
        createDropdownInDoc(parent, id);
    }
}

export {
    DropdownView
};