"use strict";

System.register(["../model/create-table-model.js"], function (_export, _context) {
  "use strict";

  var CreateTableModel;

  function CreateTableController() {
    var tableName;
    var attrDefs;
    var keySchema;
    var provisionedThroughput;

    this.transformViewInputForModel = function () {
      var input = getInputs();
      new CreateTableModel().createTable(input);
    };

    function getInputs() {
      tableName = getTableNameInput();
      keySchema = getKeySchema();
      attrDefs = getAttrDefs();
      provisionedThroughput = getProvisionedThroughput();
      var input = {
        TableName: tableName,
        KeySchema: keySchema,
        AttributeDefinitions: attrDefs,
        ProvisionedThroughput: provisionedThroughput
      };
      return input;
    }

    function getTableNameInput() {
      var tableNameInput = document.getElementById("table-name-input");
      var tableName = tableNameInput.value;
      return tableName;
    }

    function getAttrDefs() {
      var elems = getAttrCtrlItemElems();
      var inputs = elems.reduce(function (result, elem) {
        var attrName = elem.querySelector(".attr-name-input").value;
        var attrType = getAttrTypes(elem);
        result.push({
          AttributeName: attrName,
          AttributeType: attrType
        });
        return result;
      }, []);
      return inputs;
    }

    function getAttrCtrlItemElems() {
      return Array.from(document.getElementsByClassName("attr-ctrl-item"));
    }

    function getAttrTypes(attrCtrlItemElem) {
      var type = attrCtrlItemElem.querySelector(".dropdown-btn").value;

      switch (type) {
        case "string":
          return "S";

        case "number":
          return "N";

        case "boolean":
          return "B";

        default:
          throw "Unkown type: [".concat(type, "]");
      }
    }

    function getKeySchema() {
      var keySchema = [{
        AttributeName: document.querySelector("#hash-key-row .dropdown-btn").value,
        KeyType: "HASH"
      }, {
        AttributeName: document.querySelector("#range-key-row .dropdown-btn").value,
        KeyType: "RANGE"
      }];
      return keySchema;
    }

    function getProvisionedThroughput() {
      var provisionedThroughput = {
        ReadCapacityUnits: document.getElementById("read-capacity-units").value,
        WriteCapacityUnits: document.getElementById("write-capacity-units").value
      };
      return provisionedThroughput;
    }
  }

  _export("CreateTableController", CreateTableController);

  return {
    setters: [function (_modelCreateTableModelJs) {
      CreateTableModel = _modelCreateTableModelJs.CreateTableModel;
    }],
    execute: function () {}
  };
});