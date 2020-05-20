import {Util} from "../common-components/util.js";

function DropdownView() {}

DropdownView.addEventListeners = () => {
    listenOnClickWindow();
};

function listenOnClickWindow() {
    window.addEventListener("click", e => {
        const $dropdown = $(".dropdown");
        if(!$dropdown.is(event.target) && $dropdown.has(event.target).length == 0) {
            hideDropdownWhenClickOutside(e);
            changeFaCaretToDown();
        }
    });
}

function hideDropdownWhenClickOutside(event) {
    const lists = Array.from(document.querySelectorAll(".dropdown-list"));
    lists.forEach(list => list.style.display = "none");
}

function changeFaCaretToDown() {
    const iElems = Array.from(document.querySelectorAll(".dropdown-btn-container>.fa"));
    iElems.forEach(elem => {
        elem.className = "fa fa-caret-down";
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
    const dropdownBtn = document.createElement("input");
    dropdownBtn.className = "dropdown-btn";
    dropdownBtn.type = "text";

    const iElem = DropdownView.getFaCaretIElem("down");
    
    const container = document.createElement("div");
    container.className = "dropdown-btn-container";
    container.appendChild(dropdownBtn);
    container.appendChild(iElem);

    return container;
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
    });
};

function showOrHideDropdownList(dropdownElem, listItems) {
    const dropdownList = dropdownElem.querySelector(".dropdown-list");
    createListItemElems(dropdownList, listItems);
    listenOnClickListItems(dropdownList);

    Util.showOrHideElement(dropdownList);

    const iElem = dropdownElem.querySelector("i");
    toggleFaCaretUpAndDownElem(iElem);
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
        const dropdownElem = dropdownListElem.parentElement;
        const text = e.target.textContent;
        changeBtnText(text, dropdownElem);
        
        const iElem = dropdownElem.querySelector(".dropdown-btn-container>.fa");
        toggleFaCaretUpAndDownElem(iElem);
        
        hideList(dropdownElem);
    }));
}

function changeBtnText(text, dropdownElem) {
    const btnElem = dropdownElem.querySelector(".dropdown-btn");
    btnElem.value = text;
}

function toggleFaCaretUpAndDownElem(iElem) {
    const classDown = "fa-caret-down";
    const classUp = "fa-caret-up";
    if(iElem.classList.contains(classDown)) {
        iElem.classList.remove(classDown);
        iElem.classList.add(classUp);
    }
    else if(iElem.classList.contains(classUp)) {
        iElem.classList.remove(classUp);
        iElem.classList.add(classDown);
    }
}

DropdownView.getFaCaretIElem = (upOrDown) => {
    const elem = document.createElement("i");
    elem.className = "fa fa-caret-" + upOrDown;
    return elem;
};

function hideList(dropdownElem) {
    const listElem = dropdownElem.querySelector(".dropdown-list");
    listElem.style.display = "none";
}

export {
    DropdownView
};