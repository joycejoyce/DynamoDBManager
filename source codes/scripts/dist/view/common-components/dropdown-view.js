"use strict";

System.register(["../common-components/util.js"], function (_export, _context) {
  "use strict";

  var Util;

  function DropdownView() {}

  function listenOnClickWindow() {
    window.addEventListener("click", function (e) {
      var $dropdown = $(".dropdown");

      if (!$dropdown.is(event.target) && $dropdown.has(event.target).length == 0) {
        hideDropdownWhenClickOutside(e);
        changeFaCaretToDown();
      }
    });
  }

  function hideDropdownWhenClickOutside(event) {
    var lists = Array.from(document.querySelectorAll(".dropdown-list"));
    lists.forEach(function (list) {
      return list.style.display = "none";
    });
  }

  function changeFaCaretToDown() {
    var iElems = Array.from(document.querySelectorAll(".dropdown-btn-container>.fa"));
    iElems.forEach(function (elem) {
      elem.className = "fa fa-caret-down";
    });
  }

  function getDropdownBtn() {
    var dropdownBtn = document.createElement("input");
    dropdownBtn.className = "dropdown-btn";
    dropdownBtn.type = "text";
    var iElem = DropdownView.getFaCaretIElem("down");
    var container = document.createElement("div");
    container.className = "dropdown-btn-container";
    container.appendChild(dropdownBtn);
    container.appendChild(iElem);
    return container;
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
    var iElem = dropdownElem.querySelector("i");
    toggleFaCaretUpAndDownElem(iElem);
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
        var dropdownElem = dropdownListElem.parentElement;
        var text = e.target.textContent;
        changeBtnText(text, dropdownElem);
        var iElem = dropdownElem.querySelector(".dropdown-btn-container>.fa");
        toggleFaCaretUpAndDownElem(iElem);
        hideList(dropdownElem);
      });
    });
  }

  function changeBtnText(text, dropdownElem) {
    var btnElem = dropdownElem.querySelector(".dropdown-btn");
    btnElem.value = text;
  }

  function toggleFaCaretUpAndDownElem(iElem) {
    var classDown = "fa-caret-down";
    var classUp = "fa-caret-up";

    if (iElem.classList.contains(classDown)) {
      iElem.classList.remove(classDown);
      iElem.classList.add(classUp);
    } else if (iElem.classList.contains(classUp)) {
      iElem.classList.remove(classUp);
      iElem.classList.add(classDown);
    }
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
        });
      };

      DropdownView.getFaCaretIElem = function (upOrDown) {
        var elem = document.createElement("i");
        elem.className = "fa fa-caret-" + upOrDown;
        return elem;
      };
    }
  };
});