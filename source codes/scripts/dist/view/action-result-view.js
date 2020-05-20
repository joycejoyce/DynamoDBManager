"use strict";

System.register(["./confirm-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView;

  function ActionResultView() {}

  function getErrMsg(action, err) {
    var errContents = JSON.stringify(err, undefined, 2);
    var errMsg = "Unable to " + action + ":\n" + errContents;
    return errMsg;
  }

  _export("ActionResultView", ActionResultView);

  return {
    setters: [function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {
      ActionResultView.showErrMsg = function (action, err) {
        var msg = getErrMsg(action, err);
      };

      ;
    }
  };
});