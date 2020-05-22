"use strict";

System.register(["./create-table-view/create-table-view.js"], function (_export, _context) {
  "use strict";

  var CreateTableView;

  function ElementBuilder() {}

  _export("ElementBuilder", ElementBuilder);

  return {
    setters: [function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }],
    execute: function () {
      ElementBuilder.init = function () {
        new CreateTableView().createElements();
      };
    }
  };
});