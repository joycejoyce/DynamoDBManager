"use strict";

System.register(["./delete-all-attr-ctrl-item-btn-view.js", "./attr-ctrl-item-view.js", "../common-components/dropdown-view.js", "../../controller/create-table-controller.js"], function (_export, _context) {
  "use strict";

  var DeleteAllAttrBtnView, AttrCtrlItemView, DropdownView, CreateTableController;

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTablePageBtn();
      listenOnClickAddAttributeBtn();
      new DeleteAllAttrBtnView().addEventListeners();
      listenOnDropdownButtons();
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
        AttrCtrlItemView.createAnItem();
      });
    }

    function enableDeleteAllAttributesBtn() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");

      if (btn.disabled) {
        btn.disabled = false;
      }
    }

    function listenOnDropdownButtons() {
      console.log("Enter listenOnDropdownButtons()");
      listenOnClickDropdownBtn("hash-key-row");
      listenOnClickDropdownBtn("range-key-row");
    }

    function listenOnClickDropdownBtn(id) {
      console.log("Enter listenOnClickDropdownBtn()");
      var dropdownElem = document.querySelector("#" + id + " .dropdown");
      DropdownView.listenOnClickDropdownBtn(dropdownElem, getAttrNames, "No attributes defined. Please add attributes first.");
      console.log("Exit listenOnClickDropdownBtn()");
    }

    function getAttrNames() {
      var attrNameInputs = document.getElementsByClassName("attr-name-input");
      var attrNames = Array.from(attrNameInputs).map(function (input) {
        return input.value;
      }).filter(function (name) {
        return name.length > 0;
      });
      return attrNames;
    }

    function listenOnCreateTblBtn() {
      var createTblBtn = document.getElementById("create-tbl-btn");
      createTblBtn.addEventListener("click", function () {
        createTbl();
      });
    }

    function createTbl() {
      new CreateTableController().transformViewInputForModel();
    }
  }

  function createHashKeyDropdownElem() {
    console.log("Enter createHashKeyDropdownElem()");
    var dropdownDoc = DropdownView.getDropdownDoc();
    var elem = document.querySelectorAll("#hash-key-row>td")[1];
    elem.append(dropdownDoc);
    console.log("Exit createHashKeyDropdownElem()");
  }

  function createRangeKeyDropdownElem() {
    var dropdownDoc = DropdownView.getDropdownDoc();
    var elem = document.querySelectorAll("#range-key-row>td")[1];
    elem.append(dropdownDoc);
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [function (_deleteAllAttrCtrlItemBtnViewJs) {
      DeleteAllAttrBtnView = _deleteAllAttrCtrlItemBtnViewJs.DeleteAllAttrBtnView;
    }, function (_attrCtrlItemViewJs) {
      AttrCtrlItemView = _attrCtrlItemViewJs.AttrCtrlItemView;
    }, function (_commonComponentsDropdownViewJs) {
      DropdownView = _commonComponentsDropdownViewJs.DropdownView;
    }, function (_controllerCreateTableControllerJs) {
      CreateTableController = _controllerCreateTableControllerJs.CreateTableController;
    }],
    execute: function () {
      CreateTableView.createKeySchemaElements = function () {
        createHashKeyDropdownElem();
        createRangeKeyDropdownElem();
      };
    }
  };
});