"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function DropdownView() {
    var _this = this;

    var dropdown;
    var dropdownBtn;
    var dropdownList;

    (function () {
      dropdown = document.createElement("div");
      dropdown.className = "dropdown";
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

    this.setBtnText = function (text) {
      dropdownBtn.textContent = text;
    };

    this.setListItems = function (items) {
      if (items == null || items.length == 0) {
        return;
      }

      items.forEach(function (item) {
        var elem = document.createElement("a");
        elem.textContent = item;
        dropdownList.appendChild(elem);
      });
    };

    this.createDropdownInDoc = function (parent, id) {
      dropdown.id = id;
      parent.appendChild(dropdown);

      _this.listenOnClickBtn(id);
    };

    this.listenOnClickBtn = function (id) {
      var btnInDoc = document.querySelector("#" + id + ">.dropdown-btn");
      btnInDoc.addEventListener("click", function (e) {
        showOrHideDropdownList(e);
      });
    };

    function showOrHideDropdownList(event) {
      var siblings = Array.from(event.target.parentNode.childNodes);
      var dropdownList = siblings.filter(function (sibling) {
        return sibling.classList.contains("dropdown-list");
      })[0];
      var display = window.getComputedStyle(dropdownList).getPropertyValue("display");

      if (display == "block") {
        dropdownList.style.display = "none";
      } else {
        dropdownList.style.display = "block";
      }
    }
    /*function listenOnClickListItems() {
        const listItems = Array.from(dropdownList.querySelectorAll("a"));
        listItems.forEach(item => item.addEventListener("click", (e) => {
            changeBtnText(e);
            hideList();
        }));
    }
    
    function changeBtnText(event) {
        const text = event.target.textContent;
        document.querySelector("#hash-key-btn").textContent = text;
    }
    
    function hideList() {
        dropdownList.style.display = "none";
    }*/

  }

  _export("DropdownView", DropdownView);

  return {
    setters: [],
    execute: function () {}
  };
});