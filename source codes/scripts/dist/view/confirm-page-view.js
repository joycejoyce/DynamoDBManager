"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function ConfirmPageView() {
    var id;
    var msg;
    var action;

    this.setPageInfo = function (info) {
      id = info.id;
      msg = info.msg;
      action = info.action;
    };
  }

  _export("ConfirmPageView", ConfirmPageView);

  return {
    setters: [],
    execute: function () {}
  };
});