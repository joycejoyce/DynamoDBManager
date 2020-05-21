"use strict";

System.register(["../common-components/dropdown-view.js"], function (_export, _context) {
  "use strict";

  var DropdownView;

  function KeySchemaView() {
    this.createElements = function () {
      createHashKeyDropdownElem();
      createRangeKeyDropdownElem();
    };

    function createHashKeyDropdownElem() {
      var dropdownDoc = DropdownView.getDropdownDoc();
      var elem = document.querySelectorAll("#hash-key-row>td")[1];
      elem.append(dropdownDoc);
    }

    function createRangeKeyDropdownElem() {
      var dropdownDoc = DropdownView.getDropdownDoc();
      var elem = document.querySelectorAll("#range-key-row>td")[1];
      elem.append(dropdownDoc);
    }

    this.addEventListeners = function () {
      listenOnClickDropdownBtn("hash-key-row");
      listenOnClickDropdownBtn("range-key-row");
    };

    function listenOnClickDropdownBtn(id) {
      var dropdownElem = document.querySelector("#" + id + " .dropdown");
      DropdownView.listenOnClickDropdownBtn(dropdownElem, getAttrNames, "No attributes defined. Please add attributes first.");
    }

    function getAttrNames() {
      var attrNameInputs = document.querySelectorAll(".attr-name-input");
      var attrNames = Array.from(attrNameInputs).map(function (input) {
        return input.value;
      }).filter(function (name) {
        return name.length > 0;
      });
      return attrNames;
    }
  }

  _export("KeySchemaView", KeySchemaView);

  return {
    setters: [function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }],
    execute: function () {}
  };
});