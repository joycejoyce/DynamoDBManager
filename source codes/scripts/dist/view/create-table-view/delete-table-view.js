"use strict";

System.register(["../common-components/collapsible-view.js"], function (_export, _context) {
  "use strict";

  var CollapsibleView;

  function DeleteTableView() {
    this.createElements = function () {
      createPageCollapsible();
    };

    function createPageCollapsible() {
      var collapsible = CollapsibleView.getCollapsibleDoc();
      collapsible.id = "";
    }
  }

  _export("DeleteTableView", DeleteTableView);

  return {
    setters: [function (_commonComponentsCollapsibleViewJs) {
      CollapsibleView = _commonComponentsCollapsibleViewJs.CollapsibleView;
    }],
    execute: function () {}
  };
});