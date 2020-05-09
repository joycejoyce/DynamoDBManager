function CreateTableView() {
    this.addEventListeners = () => {
        listenOnClickCreateTableBtn();
    };
    
    function listenOnClickCreateTableBtn() {
        const elem = document.getElementById("create-table-btn");
        elem.addEventListener("click", () => toggleCreateTablePage(elem));
    }
    
    function toggleCreateTablePage(elem) {
        elem.classList.toggle("active-collapsible-btn");
        const page = elem.nextElementSibling;
        if(page.style.maxHeight) {
            page.style.maxHeight = null;
        }
        else {
            page.style.maxHeight = page.scrollHeight + "px";
        }
    }
}

export {
    CreateTableView
};