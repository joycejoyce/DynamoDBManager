"use strict";

System.register(["../constants/db-info.js", "./table-creator.js", "./table-deleter.js", "./table-query.js"], function (_export, _context) {
  "use strict";

  var TABLE_NAME, TableCreator, TableDeleter, TableQuery, PROCESS;

  function TableProcessor(tableName, process) {
    this.getProcessor = function () {
      switch (process) {
        case PROCESS.create:
          return new TableCreator(tableName);
          break;

        case PROCESS["delete"]:
          return new TableDeleter(tableName);
          break;

        case PROCESS.query:
          return new TableQuery(tableName);
          break;

        default:
          throw "Unexpected process [".concat(process, "]");
          break;
      }
    };
  }

  _export("TableProcessor", TableProcessor);

  return {
    setters: [function (_constantsDbInfoJs) {
      TABLE_NAME = _constantsDbInfoJs.TABLE_NAME;
    }, function (_tableCreatorJs) {
      TableCreator = _tableCreatorJs.TableCreator;
    }, function (_tableDeleterJs) {
      TableDeleter = _tableDeleterJs.TableDeleter;
    }, function (_tableQueryJs) {
      TableQuery = _tableQueryJs.TableQuery;
    }],
    execute: function () {
      _export("PROCESS", PROCESS = {
        create: "create",
        "delete": "delete",
        query: "query"
      });
    }
  };
});