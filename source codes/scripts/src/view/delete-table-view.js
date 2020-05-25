import {CollapsibleView} from "./common-components/collapsible-view.js";

DeleteTableView.id = {
    deleteTablePageCollapsible: "delete-table",
    deleteTablePageBtn: "delete-table-page-btn",
    delteTablePage: "delete-table-page"
};

function DeleteTableView() {
    this.createElements = () => {
        createPageCollapsible();
        createTableList();
    };
    
    function createPageCollapsible() {
        const collapsible = CollapsibleView.getCollapsibleDoc();
        collapsible.id = DeleteTableView.id.deleteTablePageCollapsible;
        
        const btn = collapsible.querySelector("."+CollapsibleView.className.btn);
        btn.id = DeleteTableView.id.deleteTablePageBtn;
        btn.innerHTML = "Delete tables" + btn.innerHTML;
        
        const contents = collapsible.querySelector("."+CollapsibleView.className.contents);
        contents.id = DeleteTableView.id.delteTablePage;
        
        const manageTablePage = document.getElementById("main-page-2");
        manageTablePage.appendChild(collapsible);
    }
    
    function createTableList() {
        const tbl = document.createElement("table");
        const tBody = document.createElement("tbody");
        const headerRow = document.createElement("tr");
        
    }
    
    this.addEventListeners = () => {
        listenOnClickDeteTablePageBtn();
    };
    
    function listenOnClickDeteTablePageBtn() {
        const id = DeleteTableView.id.deleteTablePageCollapsible;
        CollapsibleView.listenOnClickBtn(document.getElementById(id));
    }
}

export {
    DeleteTableView
};