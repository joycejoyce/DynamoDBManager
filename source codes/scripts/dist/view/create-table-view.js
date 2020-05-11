"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTableCollapsible();
    };

    function listenOnClickCreateTableCollapsible() {
      var elem = document.getElementById("create-table-collapsible");
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
        console.log("A");
        page.style.maxHeight = null;
      } else {
        console.log("B");
        page.style.maxHeight = page.scrollHeight + "px";
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
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [],
    execute: function () {}
  };
});