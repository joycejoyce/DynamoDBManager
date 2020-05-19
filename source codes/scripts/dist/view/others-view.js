"use strict";

System.register(["./confirm-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView;

  function OthersView() {
    this.addEventListeners = function () {
      listenOnClickMainTabs();
    };
  }

  _export("OthersView", OthersView);

  return {
    setters: [function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {}
  };
});