"use strict";

System.register(["../constants/html-properties.js"], function (_export, _context) {
  "use strict";

  var HTML_ID;

  function Message() {}

  _export("Message", Message);

  return {
    setters: [function (_constantsHtmlPropertiesJs) {
      HTML_ID = _constantsHtmlPropertiesJs.HTML_ID;
    }],
    execute: function () {
      Message.showTableProcessFailMessage = function (err, process) {
        var msg = "unable to " + process + " table: " + "\n" + JSON.stringify(err, undefined, 2);
        document.getElementById(HTML_ID.result).innerHTML = msg;
      };

      Message.showTableProcessSuccessMessage = function (data, process) {
        var msg = process + "d table: " + "\n" + JSON.stringify(data, undefined, 2);
        document.getElementById(HTML_ID.result).innerHTML = msg;
      };
    }
  };
});