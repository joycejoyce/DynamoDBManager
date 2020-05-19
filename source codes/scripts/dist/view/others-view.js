"use strict";

System.register(["./confirm-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView;

  function OthersView() {
    this.addEventListeners = function () {
      listenOnClickMainTabs();
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
  }

  _export("OthersView", OthersView);

  return {
    setters: [function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {}
  };
});