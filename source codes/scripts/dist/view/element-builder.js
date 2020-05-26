"use strict";

System.register(["./create-table-view/create-table-view.js", "./delete-table-view.js"], function (_export, _context) {
  "use strict";

  var CreateTableView, DeleteTableView;

  function ElementBuilder() {}

  _export("ElementBuilder", ElementBuilder);

  return {
    setters: [function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }, function (_deleteTableViewJs) {
      DeleteTableView = _deleteTableViewJs.DeleteTableView;
    }],
    execute: function () {
      ElementBuilder.init = function () {
        console.log("Enter init()");
        new CreateTableView().createElements();
        new DeleteTableView().createElements();
      };
    }
  };
});