"use strict";

System.register(["../constants/db-info.js", "../tools/db-setter.js", "../tools/message.js", "./table-processor.js"], function (_export, _context) {
  "use strict";

  var TABLE_NAME, TBL_TRACK_COLUMN, DBSetter, Message, PROCESS;

  function TableDeleter(tableName) {
    var dynamoDB = new DBSetter().getDynamoDB();

    this.process = function () {
      var params = {
        TableName: tableName
      };
      deleteTableByDynamoDB(params);
    };

    function deleteTableByDynamoDB(params) {
      dynamoDB.deleteTable(params, function (err, data) {
        if (err) {
          Message.showTableProcessFailMessage(err, PROCESS["delete"]);
        } else {
          Message.showTableProcessSuccessMessage(data, PROCESS["delete"]);
        }
      });
    }
  }

  _export("TableDeleter", TableDeleter);

  return {
    setters: [function (_constantsDbInfoJs) {
      TABLE_NAME = _constantsDbInfoJs.TABLE_NAME;
      TBL_TRACK_COLUMN = _constantsDbInfoJs.TBL_TRACK_COLUMN;
    }, function (_toolsDbSetterJs) {
      DBSetter = _toolsDbSetterJs.DBSetter;
    }, function (_toolsMessageJs) {
      Message = _toolsMessageJs.Message;
    }, function (_tableProcessorJs) {
      PROCESS = _tableProcessorJs.PROCESS;
    }],
    execute: function () {}
  };
});