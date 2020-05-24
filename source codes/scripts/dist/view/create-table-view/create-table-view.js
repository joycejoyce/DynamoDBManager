"use strict";

System.register(["../common-components/util.js", "../common-components/collapsible-view.js", "../common-components/dropdown-view.js", "./delete-all-attr-ctrl-item-btn-view.js", "./attr-ctrl-item-view.js", "./key-schema-view.js", "../../controller/create-table-controller.js"], function (_export, _context) {
  "use strict";

  var Util, CollapsibleView, DropdownView, DeleteAllAttrBtnView, AttrCtrlItemView, KeySchemaView, CreateTableController;

  function CreateTableView() {
    this.createElements = function () {
      new KeySchemaView().createElements();
      new AttrCtrlItemView().createAnItem();
      createCreateTablePageCollapsible();
    };

    function createCreateTablePageCollapsible() {
      var collapsibleBtn = getCreateTablePageBtnDoc();
      var collapsibleContents = document.getElementById(CreateTableView.id.createTablePage);
      collapsibleContents.classList.add(CollapsibleView.className.contents);
      var collapsible = document.createElement("div");
      collapsible.id = CreateTableView.id.createTable;
      collapsible.classList.add(CollapsibleView.className.collapsible);
      var manageTablePage = document.querySelector("#main-page-2");
      manageTablePage.insertBefore(collapsible, manageTablePage.firstChild);
      collapsible.appendChild(collapsibleBtn);
      collapsible.appendChild(collapsibleContents);
    }

    function getCreateTablePageBtnDoc() {
      var btn = CollapsibleView.getBtnDoc();
      btn.id = CreateTableView.id.createTablePageBtn;
      btn.innerHTML = "Create a table" + btn.innerHTML;
      return btn;
    }

    this.addEventListeners = function () {
      listenOnClickCreateTablePageBtn();
      listenOnClickAddAttributeBtn();
      new DeleteAllAttrBtnView().addEventListeners();
      new KeySchemaView().addEventListeners();
      listenOnSubmitCreateTableForm();
    };

    function listenOnClickCreateTablePageBtn() {
      var id = CreateTableView.id.createTable;
      CollapsibleView.listenOnClickBtn(document.getElementById(id));
    }

    function showOrHideCreateTableForm(elem) {
      var page = document.querySelector("#create-table-page");
      var overflow = Util.getComputedPropertyValue(page, "overflow");

      if (overflow == "hidden") {
        page.style.maxHeight = page.scrollHeight + "px";
        page.style.overflow = "visible";
      } else {
        page.style.maxHeight = null;
        page.style.overflow = "hidden";
      }
    }

    function toggleFaCaretUpAndDown(elem) {
      var classes = elem.classList;
      var upClass = "fa-caret-up";
      var downClass = "fa-caret-down";

      if (classes.contains(downClass)) {
        elem.classList.remove(downClass);
        elem.classList.add(upClass);
      } else if (classes.contains(upClass)) {
        elem.classList.remove(upClass);
        elem.classList.add(downClass);
      }
    }

    function listenOnClickAddAttributeBtn() {
      var elem = document.getElementById("add-attr-ctrl-item-btn");
      elem.addEventListener("click", function () {
        enableDeleteAllAttributesBtn();
        new AttrCtrlItemView().createAnItem();
      });
    }

    function enableDeleteAllAttributesBtn() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");

      if (btn.disabled) {
        btn.disabled = false;
      }
    }

    function listenOnSubmitCreateTableForm() {
      var createTblForm = document.getElementById("create-table-form");
      createTblForm.addEventListener("submit", function (e) {
        e.preventDefault();
        createTbl();
      });
    }

    function createTbl() {
      new CreateTableController().transformViewInputForModel();
    }
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [function (_commonComponentsUtilJs) {
      Util = _commonComponentsUtilJs.Util;
    }, function (_commonComponentsCollapsibleViewJs) {
      CollapsibleView = _commonComponentsCollapsibleViewJs.CollapsibleView;
    }, function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }, function (_deleteAllAttrCtrlItemBtnViewJs) {
      DeleteAllAttrBtnView = _deleteAllAttrCtrlItemBtnViewJs.DeleteAllAttrBtnView;
    }, function (_attrCtrlItemViewJs) {
      AttrCtrlItemView = _attrCtrlItemViewJs.AttrCtrlItemView;
    }, function (_keySchemaViewJs) {
      KeySchemaView = _keySchemaViewJs.KeySchemaView;
    }, function (_controllerCreateTableControllerJs) {
      CreateTableController = _controllerCreateTableControllerJs.CreateTableController;
    }],
    execute: function () {
      CreateTableView.id = {
        createTable: "create-table",
        createTablePage: "create-table-page",
        createTablePageBtn: "create-table-page-btn"
      };
    }
  };
});