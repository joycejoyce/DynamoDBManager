"use strict";

System.register(["./common-view.js", "./create-table-view/create-table-view.js", "./confirm-view.js"], function (_export, _context) {
  "use strict";

  var CommonView, CreateTableView, ConfirmView;

  function EventListener() {
    this.addEventListeners = function () {
      new CommonView().addEventListeners();
      new CreateTableView().addEventListeners();
      new ConfirmView().addEventListeners();
    };
  }

  _export("EventListener", EventListener);

  return {
    setters: [function (_commonViewJs) {
      CommonView = _commonViewJs.CommonView;
    }, function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }, function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {}
  };
});