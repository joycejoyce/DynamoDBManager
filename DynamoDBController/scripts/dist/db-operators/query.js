"use strict";

System.register(["../tools/db-setter.js"], function (_export, _context) {
  "use strict";

  var DBSetter;

  function Query() {
    var dynamoDB = new DBSetter().getDynamoDB();

    this.getAllTblNames = function () {
      var params = {};
      var tblNames = dynamoDB.listTables(params, function () {
        if (err) {
          console.log(JSON.stringify(err, undefined, 2));
        } else {
          console.log("listTables() success");
        }
      });
      console.log("tblNames");
    };
  }

  _export("Query", Query);

  return {
    setters: [function (_toolsDbSetterJs) {
      DBSetter = _toolsDbSetterJs.DBSetter;
    }],
    execute: function () {}
  };
});