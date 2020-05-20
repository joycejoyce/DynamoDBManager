"use strict";

System.register(["./confirm-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView;

  function ActionResultView() {}

  function getErrMsg(action, err) {
    var contents = JSON.stringify(err, undefined, 2);
    var msg = "Unable to " + action + ":\n" + contents;
    return msg;
  }

  function getSuccessMsg(action, data) {
    var contents = JSON.stringify(data, undefined, 2);
    var msg = "Successfully " + action + ":\n" + contents;
    return msg;
  }

  _export("ActionResultView", ActionResultView);

  return {
    setters: [function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {
      ActionResultView.showErrMsg = function (action, err) {
        console.log("Enter showErrMsg()");
        var id = action;
        var confirmMsg = "Error:";
        var info = getErrMsg(action, err);
        console.log("info", info);
        ConfirmView.createWithInfo(id, confirmMsg, info);
      };

      ;

      ActionResultView.showSuccessMsg = function (action, data) {
        var id = action;
        var confirmMsg = "Data:";
        var info = getSuccessMsg(action, data);
        ConfirmView.createWithInfo(id, confirmMsg, info);
      };

      ;
    }
  };
});