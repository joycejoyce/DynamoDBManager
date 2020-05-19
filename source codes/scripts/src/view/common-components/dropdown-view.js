import {Util} from "../common-components/util.js";

function DropdownView() {}

DropdownView.addEventListeners = () => {
    listenOnClickWindow();
};

function listenOnClickWindow() {
    window.addEventListener("click", (e) => {
        const dropdownElems = document.querySelectorAll(".dropdown>*");
        if(e.target == dropdownElems) {
            e.target.style.display = "none";
        }
    });
}

DropdownView.getDropdownDoc = () => {
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
    dropdownBtn.type = "button";

    const iElem = getFaCaretIElem("down");
    dropdownBtn.appendChild(iElem);

    return dropdownBtn;
}

function getDropdownList() {
    const dropdownList = document.createElement("div");
    dropdownList.className = "dropdown-list";

    return dropdownList;
}

DropdownView.listenOnClickDropdownBtn = (dropdownElem, getListItemsFunc, noItemMsg) => {
    const btn = dropdownElem.querySelector(".dropdown-btn");
    btn.addEventListener("click", () => {
        let listItems = getListItemsFunc();
        listItems = Util.getDistinctValues(listItems);
        if(listItems.length == 0) {
            alert(noItemMsg);
            return;
        }
        showOrHideDropdownList(dropdownElem, listItems);
        
        const dropdownList = dropdownElem.querySelector(".dropdown-list");
        listenOnClickListItems(dropdownList);
    });
};

function showOrHideDropdownList(dropdownElem, listItems) {
    const dropdownList = dropdownElem.querySelector(".dropdown-list");
    createListItemElems(dropdownList, listItems);
    listenOnClickListItems(dropdownList);

    Util.showOrHideElement(dropdownList);

    const dropdownBtn = dropdownElem.querySelector(".dropdown-btn");
    Util.changeIElem(dropdownBtn);
}

function createListItemElems(dropdownListElem, listItems) {
    dropdownListElem.innerHTML = "";
    listItems.forEach(item => {
        const elem = document.createElement("a");
        elem.textContent = item;
        dropdownListElem.appendChild(elem);
    });
}

function listenOnClickListItems(dropdownListElem) {
    const itemElems = Array.from(dropdownListElem.querySelectorAll("a"));
    itemElems.forEach(elem => elem.addEventListener("click", (e) => {
        changeBtnTextAndHideList(e.target.textContent, dropdownListElem.parentElement);
    }));
}

function changeBtnTextAndHideList(text, dropdownElem) {
    changeBtnText(text, dropdownElem);
    hideList(dropdownElem);
}

function changeBtnText(text, dropdownElem) {
    const btnElem = dropdownElem.querySelector(".dropdown-btn");
    btnElem.innerHTML = text;

    const iElem = getFaCaretIElem("down");
    btnElem.appendChild(iElem);
}

function getFaCaretIElem(upOrDown) {
    const elem = document.createElement("i");
    elem.className = "fa fa-caret-" + upOrDown;
    return elem;
}

function hideList(dropdownElem) {
    const listElem = dropdownElem.querySelector(".dropdown-list");
    listElem.style.display = "none";
}

export {
    DropdownView
};