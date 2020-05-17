"use strict";

System.register(["./delete-all-attr-ctrl-item-btn-view.js", "./attr-ctrl-item-view.js", "../common-components/dropdown-view.js"], function (_export, _context) {
  "use strict";

  var DeleteAllAttrBtnView, AttrCtrlItemView, DropdownView;

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTableBtn();
      listenOnClickAddAttributeBtn();
      new DeleteAllAttrBtnView().addEventListeners(); //listenOnClickHashKeyBtn();
    };

    function listenOnClickCreateTableBtn() {
      var elem = document.getElementById("create-table-btn");
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
        addAnAttributeControlItem(elem);
      });
    }

    function enableDeleteAllAttributesBtn() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");

      if (btn.disabled) {
        btn.disabled = false;
      }
    }

    function addAnAttributeControlItem() {
      var attrDefElem = document.getElementById("attribute-definitions");
      var attrCtrlItem = new AttrCtrlItemView().getDoc();
      attrDefElem.appendChild(attrCtrlItem);
    }

    function listenOnClickHashKeyBtn() {}

    function getAttrs() {
      var attrNameInputs = document.getElementsByClassName("attribute-name-input");
      var attrs = Array.from(attrNameInputs).map(function (input) {
        return input.value;
      });
      return attrs;
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
    }],
    execute: function () {}
  };
});