"use strict";

System.register(["./others-view.js", "./create-table-view/create-table-view.js", "./confirm-view.js", "./common-components/dropdown-view.js"], function (_export, _context) {
  "use strict";

  var OthersView, CreateTableView, ConfirmView, DropdownView;

  function EventListener() {
    this.addEventListeners = function () {
      new OthersView().addEventListeners();
      new CreateTableView().addEventListeners();
      new ConfirmView().addEventListeners();
      DropdownView.addEventListeners();
    };
  }

  _export("EventListener", EventListener);

  return {
    setters: [function (_othersViewJs) {
      OthersView = _othersViewJs.OthersView;
    }, function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }, function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }, function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }],
    execute: function () {}
  };
});