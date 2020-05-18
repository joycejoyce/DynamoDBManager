"use strict";

System.register(["./common-components/dropdown-view.js", "./create-table-view/attr-ctrl-item-view.js"], function (_export, _context) {
  "use strict";

  var DropdownView, AttrCtrlItemView;

  function ElementBuilder() {
    this.init = function () {
      new DropdownView().createElements();
      new AttrCtrlItemView().createAnItem();
    };
  }

  _export("ElementBuilder", ElementBuilder);

  return {
    setters: [function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }, function (_createTableViewAttrCtrlItemViewJs) {
      AttrCtrlItemView = _createTableViewAttrCtrlItemViewJs.AttrCtrlItemView;
    }],
    execute: function () {}
  };
});