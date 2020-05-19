"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function ConfirmView() {
    var confirmPage = ConfirmView.get();

    this.addEventListeners = function () {
      listenOnNoBtn();
      listenOnClickWindow();
    };

    function listenOnNoBtn() {
      var noBtn = confirmPage.querySelector("button.no");
      noBtn.addEventListener("click", function () {
        ConfirmView.reset();
      });
    }

    function listenOnClickWindow() {
      window.addEventListener("click", function (e) {
        if (e.target == confirmPage) {
          ConfirmView.reset();
        }
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
      ConfirmView.create = function (id, confirmMsg) {
        console.log("Enter ConfirmView.create()");
        var confirmPage = ConfirmView.get();
        confirmPage.id = id;
        confirmPage.querySelector(".confirm-msg").textContent = confirmMsg;
        confirmPage.style.display = "block";
      };

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