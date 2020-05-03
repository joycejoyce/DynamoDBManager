"use strict";

System.register(["../constants/db-info.js", "../tools/db-setter.js", "../tools/message.js", "./table-processor.js"], function (_export, _context) {
  "use strict";

  var TABLE_NAME, TBL_TRACK_COLUMN, DBSetter, Message, PROCESS;

  function TableCreator(tableName) {
    var dynamoDB = new DBSetter().getDynamoDB();

    this.process = function () {
      switch (tableName) {
        case TABLE_NAME.track:
          createTrackTable();
          break;

        default:
          throw "Unexpected tableName [".concat(tableName, "]");
          break;
      }
    };

    function createTrackTable() {
      var params = {
        TableName: TABLE_NAME.track,
        KeySchema: [{
          AttributeName: TBL_TRACK_COLUMN.userId,
          KeyType: "HASH"
        }, {
          AttributeName: TBL_TRACK_COLUMN.habitId,
          KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
          AttributeName: TBL_TRACK_COLUMN.userId,
          AttributeType: "S"
        }, {
          AttributeName: TBL_TRACK_COLUMN.habitId,
          AttributeType: "N"
        }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      };
      createTableByDynamoDB(params);
    }

    function createTableByDynamoDB(params) {
      dynamoDB.createTable(params, function (err, data) {
        if (err) {
          Message.showTableProcessFailMessage(err, PROCESS.create);
        } else {
          Message.showTableProcessSuccessMessage(data, PROCESS.create);
        }
      });
    }
  }

  _export("TableCreator", TableCreator);

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