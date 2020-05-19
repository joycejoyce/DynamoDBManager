"use strict";

System.register(["./create-table-view/create-table-view.js", "./create-table-view/attr-ctrl-item-view.js"], function (_export, _context) {
  "use strict";

  var CreateTableView, AttrCtrlItemView;

  function ElementBuilder() {}

  _export("ElementBuilder", ElementBuilder);

  return {
    setters: [function (_createTableViewCreateTableViewJs) {
      CreateTableView = _createTableViewCreateTableViewJs.CreateTableView;
    }, function (_createTableViewAttrCtrlItemViewJs) {
      AttrCtrlItemView = _createTableViewAttrCtrlItemViewJs.AttrCtrlItemView;
    }],
    execute: function () {
      ElementBuilder.init = function () {
        new CreateTableView().createElements();
      };
    }
  };
});