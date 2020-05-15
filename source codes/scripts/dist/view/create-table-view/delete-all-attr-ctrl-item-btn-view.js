"use strict";

System.register(["../confirm-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView;

  function DeleteAllAttrBtnView() {
    var confirmPage = ConfirmView.get();

    this.addEventListeners = function () {
      listenOnClick();
    };

    function listenOnClick() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");
      btn.addEventListener("click", function () {
        showConfirmPage();
        listenOnClickYesBtn();
      });
    }

    function showConfirmPage() {
      confirmPage.id = "delete-all-attr-ctrl-items";
      confirmPage.querySelector(".confirm-msg").textContent = DeleteAllAttrBtnView.confirmMessage;
      confirmPage.style.display = "block";
    }

    function listenOnClickYesBtn() {
      var yesBtn = document.querySelector("#delete-all-attr-ctrl-items .yes");
      yesBtn.addEventListener("click", function () {
        clickAllDeleteAttrBtn();
        ConfirmView.reset();
      });
    }

    function clickAllDeleteAttrBtn() {
      while (1) {
        var deleteAttrBtn = document.querySelector(".delete-attr-ctrl-item-btn");

        if (null == deleteAttrBtn) {
          break;
        }

        deleteAttrBtn.click();
      }
    }
  }

  _export("DeleteAllAttrBtnView", DeleteAllAttrBtnView);

  return {
    setters: [function (_confirmViewJs) {
      ConfirmView = _confirmViewJs.ConfirmView;
    }],
    execute: function () {
      DeleteAllAttrBtnView.confirmMessage = "Are you sure you want to delete all attributes?";
    }
  };
});