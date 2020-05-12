function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTableCollapsible();
        listenOnClickAddAttributeBtn();
    };
    
    function listenOnClickCreateTableCollapsible() {
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
        const elem = document.getElementById("add-attribute-btn");
        elem.addEventListener("click", () => {
            enableDeleteAllAttributesBtn();
            addAnAttributeControlItem(elem);
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attributes-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function addAnAttributeControlItem() {
        const attrDefElem = document.getElementById("attribute-definitions");
        const attrCtrlItem = getAttributeControlItem();
        attrDefElem.appendChild(attrCtrlItem);
        addEventListenersOnAttributeControlItem(attrCtrlItem);
    }
    
    function getAttributeControlItem() {
        const attrCtrlItem = document.createElement("div");
        attrCtrlItem.className = "attribute-control-item";
        
        const deleteBtn = getDeleteAttributeControlItemBtn();
        attrCtrlItem.appendChild(deleteBtn);
        
        const typeDropdown = getAttributeTypeDropdown();
        attrCtrlItem.appendChild(typeDropdown);
        
        const attrNameInputElem = getAttributeNameInputElem();
        attrCtrlItem.appendChild(attrNameInputElem);
        
        return attrCtrlItem;
    }
    
    function getDeleteAttributeControlItemBtn(attrCtrlItem) {
        const btn = document.createElement("img");
        btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
        btn.className = "delete-attribute-control-item-btn";
        return btn;
    }
    
    function getAttributeTypeDropdown() {
        const dropdown = document.createElement("div");
        dropdown.className = "attribute-type-dropdown";
        
        const btn = getAttributeTypeBtn();
        dropdown.appendChild(btn);
        
        const contents = getAttributeTypeContents();
        dropdown.appendChild(contents);
        
        return dropdown;
    }
    
    function getAttributeTypeBtn() {
        const btn = document.createElement("button");
        btn.textContent = "Type";
        btn.classList = "attribute-type-btn";
        return btn;
    }
    
    function getAttributeTypeContents() {
        const contents = document.createElement("div");
        contents.className = "attribute-type-contents";
        
        const typeString = document.createElement("a");
        typeString.href = "#string";
        typeString.textContent = "string";
        contents.appendChild(typeString);
        
        const typeNumber = document.createElement("a");
        typeNumber.href = "#number";
        typeNumber.textContent = "number";
        contents.appendChild(typeNumber);
        
        const typeBoolean = document.createElement("a");
        typeBoolean.href = "#boolean";
        typeBoolean.textContent = "boolean";
        contents.appendChild(typeBoolean);
        
        return contents;
    }
    
    function getAttributeNameInputElem() {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Enter attribute name...")
        input.required = true;
        input.className = "attribute-name-input";
        return input;
    }
    
    function addEventListenersOnAttributeControlItem(item) {
        addClickEventListenerOnDeleteBtn(item);
        addClickEventListenerOnAttributeTypeBtn(item);
    }
    
    function addClickEventListenerOnDeleteBtn(parent) {
        const deleteButtons = Array.from(parent.getElementsByClassName("delete-attribute-control-item-btn"));
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
        if(num == 0) {
            console.log("1");
            document.getElementById("delete-all-attributes-btn").disabled = true;
        }
        else {
            console.log("2");
        }
    }
    
    function addClickEventListenerOnAttributeTypeBtn(parent) {
        const attributeTypeButtons = Array.from(parent.getElementsByClassName("attribute-type-btn"));
        
        attributeTypeButtons.forEach(btn => btn.addEventListener("click", (e) => showAttributeTypeContents(e)));
    }
    
    function showAttributeTypeContents(event) {
        const dropdown = event.target.parentElement;
        const contents = dropdown.querySelector(".attribute-type-contents");
        const display = window.getComputedStyle(contents).getPropertyValue("display");
        if(display === "none") {
            contents.style.display = "block";
        }
        else {
            contents.style.display = "none";
        }
    }
}

export {
    CreateTableView
};