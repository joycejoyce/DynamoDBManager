"use strict";

System.register(["../common-components/common-functions.js"], function (_export, _context) {
  "use strict";

  var CommonFunctions;

  function DropdownView() {
    this.createElements = function () {
      createHashKeyDropdownElem();
      createRangeKeyDropdownElem();
    };

    function createHashKeyDropdownElem() {
      var parent = document.querySelectorAll("#hash-key-row>td")[1];
      var id = "hash-key-dropdown";
      createDropdownInDoc(parent, id);
    }

    function createDropdownInDoc(parent, id) {
      var dropdownDoc = new DropdownView().getDropdownDoc();
      dropdownDoc.id = id;
      parent.appendChild(dropdownDoc);
    }

    this.getDropdownDoc = function () {
      var dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      var dropdownBtn = getDropdownBtn();
      dropdown.appendChild(dropdownBtn);
      var dropdownList = getDropdownList();
      dropdown.appendChild(dropdownList);
      return dropdown;
    };

    function getDropdownBtn() {
      var dropdownBtn = document.createElement("button");
      dropdownBtn.className = "dropdown-btn";
      var iElem = getFaCaretDownIElem();
      dropdownBtn.appendChild(iElem);
      return dropdownBtn;
    }

    function getFaCaretDownIElem() {
      var elem = document.createElement("i");
      elem.className = "fa fa-caret-down";
      return elem;
    }

    function getDropdownList() {
      var dropdownList = document.createElement("div");
      dropdownList.className = "dropdown-list";
      return dropdownList;
    }

    this.createListItemElems = function (dropdownListElem, listItems) {
      dropdownListElem.innerHTML = "";
      listItems.forEach(function (item) {
        var elem = document.createElement("a");
        elem.textContent = item;
        dropdownListElem.appendChild(elem);
      });
    };

    this.changeBtnTextAndHideList = function (text, dropdownElem) {
      changeBtnText(text, dropdownElem);
      hideList(dropdownElem);
    };

    function changeBtnText(text, dropdownElem) {
      var btnElem = dropdownElem.querySelector(".dropdown-btn");
      btnElem.textContent = text;
    }

    function hideList(dropdownElem) {
      var listElem = dropdownElem.querySelector(".dropdown-list");
      listElem.style.display = "none";
    }

    function createRangeKeyDropdownElem() {
      var parent = document.querySelectorAll("#range-key-row>td")[1];
      var id = "range-key-dropdown";
      createDropdownInDoc(parent, id);
    }
  }

  _export("DropdownView", DropdownView);

  return {
    setters: [function (_commonComponentsCommonFunctionsJs) {
      CommonFunctions = _commonComponentsCommonFunctionsJs.CommonFunctions;
    }],
    execute: function () {}
  };
});