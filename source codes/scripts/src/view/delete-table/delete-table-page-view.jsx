import React from "react";
import ReactDOM from "react-dom";
import {CollapsibleView} from "../common-components/collapsible-view.js";

DeleteTablePageView.id = {
    deleteTablePageCollapsible: "delete-table",
    deleteTablePageBtn: "delete-table-page-btn",
    delteTablePage: "delete-table-page"
};

function DeleteTablePageView() {
    this.createElements = () => {
        createPageCollapsible();
        createTableList();
    };
    
    function createPageCollapsible() {
        const collapsible = CollapsibleView.getCollapsibleDoc();
        collapsible.id = DeleteTablePageView.id.deleteTablePageCollapsible;
        
        const btn = collapsible.querySelector("."+CollapsibleView.className.btn);
        btn.id = DeleteTablePageView.id.deleteTablePageBtn;
        btn.innerHTML = "Delete tables" + btn.innerHTML;
        
        const contents = collapsible.querySelector("."+CollapsibleView.className.contents);
        contents.id = DeleteTablePageView.id.delteTablePage;
        
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
        const id = DeleteTablePageView.id.deleteTablePageCollapsible;
        CollapsibleView.listenOnClickBtn(document.getElementById(id));
    }
}

export {
    DeleteTablePageView
};