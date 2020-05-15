function AttrCtrlItemView() {
    this.getDoc = () => {
        const attrCtrlItem = document.createElement("div");
        attrCtrlItem.className = "attribute-control-item";
        
        const deleteBtn = getDeleteAttributeControlItemBtn();
        attrCtrlItem.appendChild(deleteBtn);
        
        const typeDropdown = getAttributeTypeDropdown();
        attrCtrlItem.appendChild(typeDropdown);
        
        const attrNameInputElem = getAttributeNameInputElem();
        attrCtrlItem.appendChild(attrNameInputElem);
        
        addEventListeners(attrCtrlItem);
        
        return attrCtrlItem;
    };
    
    function getDeleteAttributeControlItemBtn(attrCtrlItem) {
        const btn = document.createElement("img");
        btn.src = "../../../resources/create-table-page/delete-attribute-btn.png";
        btn.className = "delete-attr-ctrl-item-btn";
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
        contents.className = "attribute-type-list";
        
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
    
    function addEventListeners(item) {
        listenOnClickDeleteBtn(item);
        listenOnClickAttrTypeBtn(item);
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
    
    function listenOnClickAttrTypeBtn(parent) {
        const attributeTypeButtons = Array.from(parent.getElementsByClassName("attribute-type-btn"));
        
        attributeTypeButtons.forEach(btn => btn.addEventListener("click", (e) => showOrHideTypeList(e)));
    }
    
    function showOrHideTypeList(event) {
        const dropdown = event.target.parentElement;
        const contents = dropdown.querySelector(".attribute-type-list");
        const display = window.getComputedStyle(contents).getPropertyValue("display");
        if(display === "none") {
            contents.style.display = "block";
        }
        else {
            contents.style.display = "none";
        }
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
        typeBtn.textContent = text;
    }
    
    function hideTypeList(attrCtrlItem) {
        const typeList = attrCtrlItem.querySelector(".attribute-type-list");
        typeList.style.display = "none";
    }
}

export {
    AttrCtrlItemView
};