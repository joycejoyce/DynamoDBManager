"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function CommonView() {
    this.addEventListeners = function () {
      listenOnClickMainTabs();
      listenOnClickWindow();
    };

    function listenOnClickMainTabs() {
      var mainTabElements = Array.from(document.querySelectorAll("#main-tabs>button"));
      mainTabElements.forEach(function (elem) {
        elem.addEventListener("click", function () {
          return changeActivePage(elem);
        });
      });
    }

    function changeActivePage(elem) {
      document.querySelector("#main-pages>.active").classList.remove("active");
      var num = elem.id.split("-").pop();
      var targetId = "main-page-".concat(num);
      document.getElementById(targetId).classList.add("active");
    }

    function listenOnClickWindow() {
      window.addEventListener("click", function (e) {
        hideConfirmContainer(e);
      });
    }

    function hideConfirmContainer(event) {
      var confirmContainer = document.getElementsByClassName("confirm-container")[0];

      if (event.target == confirmContainer) {
        confirmContainer.style.display = "none";
        confirmContainer.id = "";
      }
    }
  }

  _export("CommonView", CommonView);

  return {
    setters: [],
    execute: function () {}
  };
});