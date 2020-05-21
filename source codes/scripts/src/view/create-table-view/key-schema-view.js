import {DropdownView} from "../common-components/dropdown-view.js";

function KeySchemaView() {
    this.createElements = () => {
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
        elem.append(dropdownDoc);
    }
    
    this.addEventListeners = () => {
        listenOnClickDropdownBtn("hash-key-row");
        listenOnClickDropdownBtn("range-key-row");
    };
    
    function listenOnClickDropdownBtn(id) {
        const dropdownElem = document.querySelector("#" + id + " .dropdown");
        DropdownView.listenOnClickDropdownBtn(dropdownElem, getAttrNames, "No attributes defined. Please add attributes first.");
    }
    
    function getAttrNames() {
        const attrNameInputs = document.querySelectorAll(".attr-name-input");
        
        const attrNames = Array.from(attrNameInputs)
            .map(input => input.value)
            .filter(name => name.length > 0);
        
        return attrNames;
    }
}

export {
    KeySchemaView
};