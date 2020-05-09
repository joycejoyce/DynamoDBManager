"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function CreateTableView() {
    this.addEventListeners = function () {
      listenOnClickCreateTableBtn();
    };

    function listenOnClickCreateTableBtn() {
      var elem = document.getElementById("create-table-btn");
      elem.addEventListener("click", function () {
        return toggleCreateTablePage(elem);
      });
    }

    function toggleCreateTablePage(elem) {
      elem.classList.toggle("active-collapsible-btn");
      var page = elem.nextElementSibling;

      if (page.style.maxHeight) {
        page.style.maxHeight = null;
      } else {
        page.style.maxHeight = page.scrollHeight + "px";
      }
    }
  }

  _export("CreateTableView", CreateTableView);

  return {
    setters: [],
    execute: function () {}
  };
});