"use strict";

System.register(["./main-tab-view.js", "./create-table-view/create-table-view.js", "./common-components/confirm-view.js", "./common-components/dropdown-view.js"], function (_export, _context) {
  "use strict";

  var MainTabView, CreateTableView, ConfirmView, DropdownView;

  function EventListener() {
    this.addEventListeners = function () {
      new MainTabView().addEventListeners();
      new CreateTableView().addEventListeners();
      new ConfirmView().addEventListeners();
      DropdownView.addEventListeners();
    };
  }

  _export("EventListener", EventListener);

  return {
    setters: [function (_mainTabViewJs) {
      MainTabView = _mainTabViewJs.MainTabView;
    }, function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }, function (_commonComponentsConfirmViewJs) {
      ConfirmView = _commonComponentsConfirmViewJs.ConfirmView;
    }, function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }],
    execute: function () {}
  };
});