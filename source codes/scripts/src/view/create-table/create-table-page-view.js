import {Util} from "../common-components/util.js";
import {CollapsibleView} from "../common-components/collapsible-view.js";
import {DropdownView} from "../common-components/dropdown-view.js";
import {DeleteAllAttrBtnView} from "./delete-all-attr-ctrl-item-btn-view.js";
import {AttrCtrlItemView} from "./attr-ctrl-item-view.js";
import {KeySchemaView} from "./key-schema-view.js";
import {CreateTableController} from "../../controller/create-table-controller.js";

CreateTablePageView.id = {
    createTable: "create-table",
    createTablePage: "create-table-page",
    createTablePageBtn: "create-table-page-btn"
};

function CreateTablePageView() {
    this.createElements = () => {
        new KeySchemaView().createElements();
        new AttrCtrlItemView().createAnItem();
        createCreateTablePageCollapsible();
    };
    
    function createCreateTablePageCollapsible() {
        const collapsibleBtn = getCreateTablePageBtnDoc();
        
        const collapsibleContents = document.getElementById(CreateTablePageView.id.createTablePage);
        collapsibleContents.classList.add(CollapsibleView.className.contents);
        
        const collapsible = document.createElement("div");
        collapsible.id = CreateTablePageView.id.createTable;
        collapsible.classList.add(CollapsibleView.className.collapsible);
        
        const manageTablePage = document.querySelector("#main-page-2");
        manageTablePage.insertBefore(collapsible, manageTablePage.firstChild);
        
        collapsible.appendChild(collapsibleBtn);
        collapsible.appendChild(collapsibleContents);
    }
    
    function getCreateTablePageBtnDoc() {
        const btn = CollapsibleView.getBtnDoc();
        btn.id = CreateTablePageView.id.createTablePageBtn;
        btn.innerHTML = "Create a table" + btn.innerHTML;
        return btn;
    }
    
    this.addEventListeners = () => {
        listenOnClickCreateTablePageBtn();
        listenOnClickAddAttributeBtn();
        new DeleteAllAttrBtnView().addEventListeners();
        new KeySchemaView().addEventListeners();
        listenOnSubmitCreateTableForm();
    };
    
    function listenOnClickCreateTablePageBtn() {
        const id = CreateTablePageView.id.createTable;
        CollapsibleView.listenOnClickBtn(document.getElementById(id));
    }
    
    function showOrHideCreateTableForm(elem) {
        const page = document.querySelector("#create-table-page");
        const overflow = Util.getComputedPropertyValue(page, "overflow");
        if(overflow == "hidden") {
            page.style.maxHeight = page.scrollHeight + "px";
            page.style.overflow = "visible";
        }
        else {
            page.style.maxHeight = null;
            page.style.overflow = "hidden";
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
        const elem = document.getElementById("add-attr-ctrl-item-btn");
        elem.addEventListener("click", () => {
            enableDeleteAllAttributesBtn();
            new AttrCtrlItemView().createAnItem();
            
            const createTablePageBtn = document.querySelector("#"+CreateTablePageView.id.createTablePageBtn);
            createTablePageBtn.click(); createTablePageBtn.click();
        });
    }
    
    function enableDeleteAllAttributesBtn() {
        const btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        if(btn.disabled) {
            btn.disabled = false;
        }
    }
    
    function listenOnSubmitCreateTableForm() {
        const createTblForm = document.getElementById("create-table-form");
        createTblForm.addEventListener("submit", (e) => {
            e.preventDefault();
            createTbl();
        });
    }
    
    function createTbl() {
        new CreateTableController().transformViewInputForModel();
    }
}

export {
    CreateTablePageView
};