"use strict";

System.register(["./common-components/collapsible-view.js"], function (_export, _context) {
  "use strict";

  var CollapsibleView;

  function DeleteTableView() {
    this.createElements = function () {
      createPageCollapsible();
      createTableList();
    };

    function createPageCollapsible() {
      var collapsible = CollapsibleView.getCollapsibleDoc();
      collapsible.id = DeleteTableView.id.deleteTablePageCollapsible;
      var btn = collapsible.querySelector("." + CollapsibleView.className.btn);
      btn.id = DeleteTableView.id.deleteTablePageBtn;
      btn.innerHTML = "Delete tables" + btn.innerHTML;
      var contents = collapsible.querySelector("." + CollapsibleView.className.contents);
      contents.id = DeleteTableView.id.delteTablePage;
      var manageTablePage = document.getElementById("main-page-2");
      manageTablePage.appendChild(collapsible);
    }

    function createTableList() {
      var tbl = document.createElement("table");
      var tBody = document.createElement("tbody");
      var headerRow = document.createElement("tr");
    }

    this.addEventListeners = function () {
      listenOnClickDeteTablePageBtn();
    };

    function listenOnClickDeteTablePageBtn() {
      var id = DeleteTableView.id.deleteTablePageCollapsible;
      CollapsibleView.listenOnClickBtn(document.getElementById(id));
    }
  }

  _export("DeleteTableView", DeleteTableView);

  return {
    setters: [function (_commonComponentsCollapsibleViewJs) {
      CollapsibleView = _commonComponentsCollapsibleViewJs.CollapsibleView;
    }],
    execute: function () {
      DeleteTableView.id = {
        deleteTablePageCollapsible: "delete-table",
        deleteTablePageBtn: "delete-table-page-btn",
        delteTablePage: "delete-table-page"
      };
    }
  };
});