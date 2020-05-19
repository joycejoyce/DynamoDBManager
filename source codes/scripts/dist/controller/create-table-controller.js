"use strict";

System.register(["../view/create-table-view/attr-ctrl-item-view.js"], function (_export, _context) {
  "use strict";

  var DEFAULT_TYPE_TEXT, ATTR_TYPES;

  function CreateTableController() {
    var tableName;
    var attrDefs;
    var keySchema;
    var provisionedThroughput;

    this.transformViewInputForModel = function () {
      checkInputs();
      getInputs();
    };

    function getInputs() {
      tableName = getTableNameInput();
      attrDefs = getAttrDefs();
      keySchema = getKeySchema();
      provisionedThroughput = getProvisionedThroughput();
      console.log("tableName", tableName);
      console.log("attrDefs", attrDefs);
      console.log("keySchema", keySchema);
      console.log("provisionedThroughput", provisionedThroughput);
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
        var attrType = elem.querySelector(".attribute-type-btn").textContent;
        result.push({
          AttributeName: attrName,
          AttributeType: attrType
        });
        return result;
      }, []);
      return inputs;
    }

    function getAttrCtrlItemElems() {
      return Array.from(document.getElementsByClassName("attribute-control-item"));
    }

    function getKeySchema() {
      var keySchema = [{
        AttributeName: document.querySelector("#hash-key-dropdown>.dropdown-btn").textContent,
        KeyType: "HASH"
      }, {
        AttributeName: document.querySelector("#range-key-dropdown>.dropdown-btn").textContent,
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

    function checkInputs() {
      checkAttrDefs();
    }

    function checkAttrDefs() {
      var elems = getAttrTypeBtnElems();
      elems.forEach(function (elem) {
        var pattern = Object.values(ATTR_TYPES).reduce(function (result, type, i) {
          if (i > 0) {
            result += "|";
          }

          result += type;
          return result;
        }, "");
        var title = "Choose a type";
        elem.pattern = pattern;
        elem.title = title;
      });
    }

    function getAttrTypeBtnElems() {
      return document.querySelectorAll(".attribute-type-btn");
    }
  }

  _export("CreateTableController", CreateTableController);

  return {
    setters: [function (_viewCreateTableViewAttrCtrlItemViewJs) {
      DEFAULT_TYPE_TEXT = _viewCreateTableViewAttrCtrlItemViewJs.DEFAULT_TYPE_TEXT;
      ATTR_TYPES = _viewCreateTableViewAttrCtrlItemViewJs.ATTR_TYPES;
    }],
    execute: function () {}
  };
});