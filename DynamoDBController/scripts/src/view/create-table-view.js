function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTableBtn();
    };
    
    function listenOnClickCreateTableBtn() {
        const elem = document.getElementById("create-table-btn");
        elem.addEventListener("click", () => toggleCreateTablePage(elem));
    }
    
    function toggleCreateTablePage(elem) {
        const faCaretElem = elem.querySelector("i");
        toggleFaCaretUpAndDown(faCaretElem);
        
        const page = elem.nextElementSibling;
        if(page.style.maxHeight) {
            page.style.maxHeight = null;
        }
        else {
            page.style.maxHeight = page.scrollHeight + "px";
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
}

export {
    CreateTableView
};