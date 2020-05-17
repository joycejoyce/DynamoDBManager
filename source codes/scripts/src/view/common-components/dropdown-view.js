function DropdownView() {
    let dropdown;
    let dropdownBtn;
    let dropdownList;
    (() => {
        dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        
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
    
    this.setBtnText = (text) => {
        dropdownBtn.textContent = text;
    };
    
    this.setListItems = (items) => {
        if(items == null || items.length == 0) {
            return;
        }
        items.forEach(item => {
            const elem = document.createElement("a");
            elem.textContent = item;
            dropdownList.appendChild(elem);
        });
    }
    
    this.createDropdownInDoc = (parent, id) => {
        dropdown.id = id;
        parent.appendChild(dropdown);
        this.listenOnClickBtn(id);
    }
    
    this.listenOnClickBtn = (id) => {
        const btnInDoc = document.querySelector("#"+id+">.dropdown-btn");
        btnInDoc.addEventListener("click", (e) => {
            showOrHideDropdownList(e);
        });
    };

    function showOrHideDropdownList(event) {
        const siblings = Array.from(event.target.parentNode.childNodes);
        
        const dropdownList = siblings.filter(sibling => sibling.classList.contains("dropdown-list"))[0];
        
        const display = window.getComputedStyle(dropdownList).getPropertyValue("display");
        if(display == "block") {
            dropdownList.style.display = "none";
        }
        else {
            dropdownList.style.display = "block";
        }
    }
    
    /*function listenOnClickListItems() {
        const listItems = Array.from(dropdownList.querySelectorAll("a"));
        listItems.forEach(item => item.addEventListener("click", (e) => {
            changeBtnText(e);
            hideList();
        }));
    }
    
    function changeBtnText(event) {
        const text = event.target.textContent;
        document.querySelector("#hash-key-btn").textContent = text;
    }
    
    function hideList() {
        dropdownList.style.display = "none";
    }*/
}

export {
    DropdownView
};