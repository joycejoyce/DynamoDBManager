"use strict";

System.register(["../common-components/util.js"], function (_export, _context) {
  "use strict";

  var Util;

  function DropdownView() {}

  function listenOnClickWindow() {
    window.addEventListener("click", function (e) {
      var dropdownElems = document.querySelectorAll(".dropdown>*");

      if (e.target == dropdownElems) {
        e.target.style.display = "none";
      }
    });
  }

  function getDropdownBtn() {
    var dropdownBtn = document.createElement("button");
    dropdownBtn.className = "dropdown-btn";
    dropdownBtn.type = "button";
    var iElem = getFaCaretIElem("down");
    dropdownBtn.appendChild(iElem);
    return dropdownBtn;
  }

  function getDropdownList() {
    var dropdownList = document.createElement("div");
    dropdownList.className = "dropdown-list";
    return dropdownList;
  }

  function showOrHideDropdownList(dropdownElem, listItems) {
    var dropdownList = dropdownElem.querySelector(".dropdown-list");
    createListItemElems(dropdownList, listItems);
    listenOnClickListItems(dropdownList);
    Util.showOrHideElement(dropdownList);
    var dropdownBtn = dropdownElem.querySelector(".dropdown-btn");
    Util.changeIElem(dropdownBtn);
  }

  function createListItemElems(dropdownListElem, listItems) {
    dropdownListElem.innerHTML = "";
    listItems.forEach(function (item) {
      var elem = document.createElement("a");
      elem.textContent = item;
      dropdownListElem.appendChild(elem);
    });
  }

  function listenOnClickListItems(dropdownListElem) {
    var itemElems = Array.from(dropdownListElem.querySelectorAll("a"));
    itemElems.forEach(function (elem) {
      return elem.addEventListener("click", function (e) {
        changeBtnTextAndHideList(e.target.textContent, dropdownListElem.parentElement);
      });
    });
  }

  function changeBtnTextAndHideList(text, dropdownElem) {
    changeBtnText(text, dropdownElem);
    hideList(dropdownElem);
  }

  function changeBtnText(text, dropdownElem) {
    var btnElem = dropdownElem.querySelector(".dropdown-btn");
    btnElem.innerHTML = text;
    var iElem = getFaCaretIElem("down");
    btnElem.appendChild(iElem);
  }

  function getFaCaretIElem(upOrDown) {
    var elem = document.createElement("i");
    elem.className = "fa fa-caret-" + upOrDown;
    return elem;
  }

  function hideList(dropdownElem) {
    var listElem = dropdownElem.querySelector(".dropdown-list");
    listElem.style.display = "none";
  }

  _export("DropdownView", DropdownView);

  return {
    setters: [function (_commonComponentsUtilJs) {
      Util = _commonComponentsUtilJs.Util;
    }],
    execute: function () {
      DropdownView.addEventListeners = function () {
        listenOnClickWindow();
      };

      DropdownView.getDropdownDoc = function () {
        var dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        var dropdownBtn = getDropdownBtn();
        dropdown.appendChild(dropdownBtn);
        var dropdownList = getDropdownList();
        dropdown.appendChild(dropdownList);
        return dropdown;
      };

      DropdownView.listenOnClickDropdownBtn = function (dropdownElem, getListItemsFunc, noItemMsg) {
        var btn = dropdownElem.querySelector(".dropdown-btn");
        btn.addEventListener("click", function () {
          var listItems = getListItemsFunc();
          listItems = Util.getDistinctValues(listItems);

          if (listItems.length == 0) {
            alert(noItemMsg);
            return;
          }

          showOrHideDropdownList(dropdownElem, listItems);
          var dropdownList = dropdownElem.querySelector(".dropdown-list");
          listenOnClickListItems(dropdownList);
        });
      };
    }
  };
});