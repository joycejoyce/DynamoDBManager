"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function MsgGenerator() {}

  return {
    setters: [],
    execute: function () {
      MsgGenerator.getAwsErr = function (action, err) {
        var awsErrMsg = JSON.stringify(err, undefined, 2);
        var errMsg = "Unable to " + action + ":\n" + awsErrMsg;
        return errMsg;
      };
    }
  };
});