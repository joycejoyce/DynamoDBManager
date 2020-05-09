"use strict";

System.register(["./common-view.js", "./create-table-view.js"], function (_export, _context) {
  "use strict";

  var CommonView, CreateTableView;

  function EventListener() {
    this.addEventListeners = function () {
      new CommonView().addEventListeners();
      new CreateTableView().addEventListeners();
    };
  }

  _export("EventListener", EventListener);

  return {
    setters: [function (_commonViewJs) {
      CommonView = _commonViewJs.CommonView;
    }, function (_createTableViewJs) {
      CreateTableView = _createTableViewJs.CreateTableView;
    }],
    execute: function () {}
  };
});