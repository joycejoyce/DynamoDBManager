"use strict";

System.register(["./db-connection.js", "../view/common-components/action-result-view.js"], function (_export, _context) {
  "use strict";

  var DBConnection, ActionResultView;

  function CreateTableModel() {
    var dbApi = new DBConnection().getDBApi();

    this.createTable = function (params) {
      var action = "create-table";
      dbApi.createTable(params, function (err, data) {
        if (err) {
          console.log("has err");
          ActionResultView.showErrMsg(action, err);
          /*document.getElementById('textarea').innerHTML = "Unable to create table: " + "\n" + JSON.stringify(err, undefined, 2);*/
        } else {
          console.log("no err");
          ActionResultView.showSuccessMsg(action, data);
          /*document.getElementById('textarea').innerHTML = "Created table: " + "\n" + JSON.stringify(data, undefined, 2);*/
        }
      });
    };
  }

  _export("CreateTableModel", CreateTableModel);

  return {
    setters: [function (_dbConnectionJs) {
      DBConnection = _dbConnectionJs.DBConnection;
    }, function (_viewCommonComponentsActionResultViewJs) {
      ActionResultView = _viewCommonComponentsActionResultViewJs.ActionResultView;
    }],
    execute: function () {}
  };
});