"use strict";

System.register(["./delete-all-attr-ctrl-item-btn-view.js", "./attr-ctrl-item-view.js", "../common-components/dropdown-view.js", "../common-components/common-functions.js", "../../controller/create-table-controller.js"], function (_export, _context) {
  "use strict";

  var DeleteAllAttrBtnView, AttrCtrlItemView, DropdownView, CommonFunctions, CreateTableController;

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTablePageBtn();
      listenOnClickAddAttributeBtn();
      new DeleteAllAttrBtnView().addEventListeners();
      listenOnDropdownBtn();
      listenOnCreateTblBtn();
    };

    function listenOnClickCreateTablePageBtn() {
      var elem = document.getElementById("create-table-page-btn");
      elem.addEventListener("click", function () {
        return toggleCreateTablePage(elem);
      });
    }

    function toggleCreateTablePage(elem) {
      var faCaretElem = elem.querySelector("i");
      toggleFaCaretUpAndDown(faCaretElem);
      var page = elem.nextElementSibling;

      if (page.style.maxHeight) {
        //not zero, not empty string, not null
        page.style.maxHeight = null;
        page.style.overflow = "hidden";
      } else {
        page.style.maxHeight = page.scrollHeight + "px";
        page.style.overflow = "visible";
      }
    }

    function toggleFaCaretUpAndDown(elem) {
      var classes = elem.classList;
      var upClass = "fa-caret-up";
      var downClass = "fa-caret-down";

      if (classes.contains(downClass)) {
        elem.classList.remove(downClass);
        elem.classList.add(upClass);
      } else if (classes.contains(upClass)) {
        elem.classList.remove(upClass);
        elem.classList.add(downClass);
      }
    }

    function listenOnClickAddAttributeBtn() {
      var elem = document.getElementById("add-attr-ctrl-item-btn");
      elem.addEventListener("click", function () {
        enableDeleteAllAttributesBtn();
        new AttrCtrlItemView().createAnItem();
      });
    }

    function enableDeleteAllAttributesBtn() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");

      if (btn.disabled) {
        btn.disabled = false;
      }
    }

    function listenOnDropdownBtn() {
      listenOnClickHashKeyBtn();
      listenOnClickRangeKeyBtn();
    }

    function listenOnClickHashKeyBtn() {
      var hashKeyBtn = document.querySelector("#hash-key-dropdown>.dropdown-btn");
      hashKeyBtn.addEventListener("click", function () {
        var id = "hash-key-dropdown";
        showOrHideAttrNameList(id);
        listenOnClickAttrNameListItems(id);
      });
    }

    function showOrHideAttrNameList(id) {
      createAttrNameDropdownList(id);
      var dropdownListElem = getDropdownListElem(id);
      new CommonFunctions().showOrHideElement(dropdownListElem);
    }

    function createAttrNameDropdownList(id) {
      var dropdownListElem = getDropdownListElem(id);

      try {
        var attrNames = getAttrNames();
        new DropdownView().createListItemElems(dropdownListElem, attrNames);
      } catch (e) {
        alert(e);
      }
    }

    function getDropdownListElem(id) {
      return document.querySelector("#" + id + ">.dropdown-list");
    }

    function getAttrNames() {
      var attrNameInputs = document.getElementsByClassName("attribute-name-input");
      var attrNames = Array.from(attrNameInputs).map(function (input) {
        return input.value;
      }).filter(function (name) {
        return name.length > 0;
      });
      attrNames = new CommonFunctions().getDistinctValues(attrNames);

      if (attrNames.length == 0) {
        throw "No attributes. Please add attribute definitions first.";
      }

      return attrNames;
    }

    function listenOnClickAttrNameListItems(id) {
      var itemElems = Array.from(getDropdownListElem(id).querySelectorAll("a"));
      itemElems.forEach(function (elem) {
        elem.addEventListener("click", function (e) {
          var dropdownView = new DropdownView();
          var dropdownElem = getDropdownElem(id);
          dropdownView.changeBtnTextAndHideList(e.target.textContent, dropdownElem);
        });
      });
    }

    function getDropdownElem(id) {
      return document.getElementById(id);
    }

    function listenOnClickRangeKeyBtn() {
      var rangeKeyBtn = document.querySelector("#range-key-dropdown>.dropdown-btn");
      rangeKeyBtn.addEventListener("click", function () {
        var id = "range-key-dropdown";
        showOrHideAttrNameList(id);
        listenOnClickAttrNameListItems(id);
      });
    }

    function listenOnCreateTblBtn() {
      var createTblBtn = document.getElementById("create-tbl-btn");
      createTblBtn.addEventListener("click", createTbl);
    }

    function createTbl() {
      new CreateTableController().transformViewInputForModel();
    }
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [function (_deleteAllAttrCtrlItemBtnViewJs) {
      DeleteAllAttrBtnView = _deleteAllAttrCtrlItemBtnViewJs.DeleteAllAttrBtnView;
    }, function (_attrCtrlItemViewJs) {
      AttrCtrlItemView = _attrCtrlItemViewJs.AttrCtrlItemView;
    }, function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }, function (_commonComponentsCommonFunctionsJs) {
      CommonFunctions = _commonComponentsCommonFunctionsJs.CommonFunctions;
    }, function (_controllerCreateTableControllerJs) {
      CreateTableController = _controllerCreateTableControllerJs.CreateTableController;
    }],
    execute: function () {}
  };
});