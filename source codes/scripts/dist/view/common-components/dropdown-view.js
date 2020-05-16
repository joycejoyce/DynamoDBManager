"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function DropdownView() {
    var dropdown;
    var dropdownBtn;
    var dropdownList;

    (function () {
      dropdown = document.createElement("div");
      dropdownBtn = getDropdownBtn();
      dropdown.appendChild(dropdownBtn);
      dropdownList = getDropdownList();
      dropdown.appendChild(dropdownList);
    })();

    function getDropdownBtn() {
      var dropdownBtn = document.createElement("button");
      dropdownBtn.className = "dropdown-btn";
      return dropdownBtn;
    }

    function getDropdownList() {
      var dropdownList = document.createElement("div");
      dropdownList.className = "dropdown-list";
      return dropdownList;
    }

    this.getDoc = function () {
      return dropdown;
    };

    this.getBtn = function () {
      return dropdownBtn;
    };

    this.getList = function () {
      return dropdownList;
    };

    this.setBtn = function (obj) {
      dropdownBtn.value = obj.value;
      dropdownBtn.addEventListener("click", obj.clickEvent);
    };

    this.setList = function (ary) {
      if (ary.length == 0) {
        return;
      }

      ary.forEach(function (item) {
        var elem = document.createElement("a");
        elem.textContent = item;
        dropdownList.appendChild(elem);
      });
    };
  }

  _export("DropdownView", DropdownView);

  return {
    setters: [],
    execute: function () {}
  };
});