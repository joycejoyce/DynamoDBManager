"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function ConfirmView(obj) {
    var confirmPage = ConfirmView.get();

    this.addEventListeners = function () {
      listenOnNoBtn();
    };

    function listenOnNoBtn() {
      var noBtn = confirmPage.querySelector("button.no");
      noBtn.addEventListener("click", function () {
        ConfirmView.reset();
      });
    }
  }

  function hide(elem) {
    elem.style.display = "none";
  }

  function removeId(elem) {
    elem.id = "";
  }

  _export("ConfirmView", ConfirmView);

  return {
    setters: [],
    execute: function () {
      ConfirmView.get = function () {
        return document.querySelector(".confirm-container");
      };

      ConfirmView.reset = function () {
        var confirmPage = ConfirmView.get();
        hide(confirmPage);
        removeId(confirmPage);
      };
    }
  };
});