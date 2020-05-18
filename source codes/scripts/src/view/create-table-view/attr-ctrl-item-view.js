import {DropdownView} from "../common-components/dropdown-view.js";
import {CommonFunctions} from "../common-components/common-functions.js";

function AttrCtrlItemView() {
    this.createAnItem = () => {
        const itemDoc = getDoc();
        const itemTbl = document.querySelector("#attr-ctrl-item-tbl>tbody");
        itemTbl.appendChild(itemDoc);
        
        addEventListeners(itemTbl.lastChild);
    };
    
    function getDoc() {
        const tblRow = document.createElement("tr");
        
        const deleteBtn = getDeleteAttributeControlItemBtn();
        const td1 = document.createElement("td");
        td1.appendChild(deleteBtn);
        tblRow.appendChild(td1);
        
        const typeDropdown = getAttributeTypeDropdown();
        const td2 = document.createElement("td");
        td2.appendChild(typeDropdown);
        tblRow.appendChild(td2);
        
        const attrNameInputElem = getAttributeNameInputElem();
        const td3 = document.createElement("td");
        td3.appendChild(attrNameInputElem);
        tblRow.appendChild(td3);
        
        return tblRow;
    }

    function getDeleteAttributeControlItemBtn(attrCtrlItem) {
        const btn = document.createElement("img");
        btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
        btn.className = "delete-attr-ctrl-item-btn";
        return btn;
    }
    
    function getAttributeTypeDropdown() {
        const dropdownView = new DropdownView();
        
        const dropdown = dropdownView.getDropdownDoc();
        dropdown.classList.add("attribute-type-dropdown");
        
        dropdownView.createListItemElems(dropdown.querySelector(".dropdown-list"), Object.values(ATTR_TYPES));
        
        /*const input = getAttributeTypeInput();
        dropdown.appendChild(input);
        
        const contents = getAttributeTypeContents();
        dropdown.appendChild(contents);*/
        
        return dropdown;
    }
    
    function getAttributeTypeInput() {
        const input = document.createElement("input");
        input.placeholder = "Choose a type";
        input.classList = "attribute-type-btn";
        return input;
    }
    
    function getAttributeNameInputElem() {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Enter attribute name...")
        input.required = true;
        input.className = "attribute-name-input";
        return input;
    }
    
    function addEventListeners(item) {
        listenOnClickDeleteBtn(item);
        listenOnClickAttrTypeInput(item);
        listenOnClickTypeListItems(item);
    }
    
    function listenOnClickDeleteBtn(parent) {
        const deleteButtons = Array.from(parent.getElementsByClassName("delete-attr-ctrl-item-btn"));
        deleteButtons.forEach(btn => btn.addEventListener("click", (e) => {
            disableDeleteAllBtnWhenNoItem();
            deleteAttributeControlItem(e);
        }));
    }
    
    function deleteAttributeControlItem(event) {
        event.target.parentElement.remove();
    }
    
    function disableDeleteAllBtnWhenNoItem() {
        const num = document.getElementsByClassName("attribute-control-item").length;
        if(num - 1 == 0) {
            document.getElementById("delete-all-attr-ctrl-item-btn").disabled = true;
        }
    }
    
    function listenOnClickAttrTypeInput(parent) {
        console.log("Enter listenOnClickAttrTypeInput()");
        const attributeTypeBtn = parent.querySelector(".dropdown-btn");
        console.log("attributeTypeBtn", attributeTypeBtn.outerHTML);
        
        attributeTypeBtn.addEventListener("click", (e) => showOrHideTypeList(e));
    }
    
    function showOrHideTypeList(event) {
        const dropdown = event.target.parentElement;
        console.log("dropdown", dropdown.outerHTML);
        const listElem = dropdown.querySelector(".dropdown-list");
        new CommonFunctions().showOrHideElement(listElem);
        /*const display = window.getComputedStyle(list).getPropertyValue("display");
        if(display === "none") {
            contents.style.display = "block";
        }
        else {
            contents.style.display = "none";
        }*/
    }
    
    function listenOnClickTypeListItems(item) {
        const typeListItems = Array.from(item.querySelectorAll(".attribute-type-list>a"));
        typeListItems.forEach(elem => elem.addEventListener("click", (e) => {
            replaceTypeBtnText(e, item);
            hideTypeList(item);
        }));
    }
    
    function replaceTypeBtnText(event, attrCtrlItem) {
        const text = event.target.textContent;
        const typeBtn = attrCtrlItem.querySelector(".attribute-type-btn");
        //typeBtn.textContent = text;
        typeBtn.value = text;
    }
    
    function hideTypeList(attrCtrlItem) {
        const typeList = attrCtrlItem.querySelector(".attribute-type-list");
        typeList.style.display = "none";
    }
}

const DEFAULT_TYPE_TEXT = "Type";
const ATTR_TYPES = {
    string: "string",
    number: "number",
    boolean: "boolean"
};

export {
    AttrCtrlItemView,
    DEFAULT_TYPE_TEXT,
    ATTR_TYPES
};