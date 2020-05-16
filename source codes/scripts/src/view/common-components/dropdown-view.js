function DropdownView() {
    let dropdown;
    let dropdownBtn;
    let dropdownList;
    (() => {
        dropdown = document.createElement("div");
        
        dropdownBtn = getDropdownBtn();
        dropdown.appendChild(dropdownBtn);
        
        dropdownList = getDropdownList();
        dropdown.appendChild(dropdownList);
    })();
    
    function getDropdownBtn() {
        const dropdownBtn = document.createElement("button");
        dropdownBtn.className = "dropdown-btn";
        
        return dropdownBtn;
    }
    
    function getDropdownList() {
        const dropdownList = document.createElement("div");
        dropdownList.className = "dropdown-list";
        
        return dropdownList;
    }
    
    this.getDoc = () => {
        return dropdown;
    };
    
    this.getBtn = () => {
        return dropdownBtn;
    };
    
    this.getList = () => {
        return dropdownList;
    };
    
    this.setBtn = (obj) => {
        dropdownBtn.value = obj.value;
        dropdownBtn.addEventListener("click", obj.clickEvent);
    };
    
    this.setList = (ary) => {
        if(ary.length == 0) {
            return;
        }
        ary.forEach(item => {
            const elem = document.createElement("a");
            elem.textContent = item;
            dropdownList.appendChild(elem);
        });
    }
}

export {
    DropdownView
};