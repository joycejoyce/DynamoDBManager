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
      var btn = document.getElementById("delete-all-attributes-btn");
      btn.addEventListener("click", function () {
        showConfirmPage();
        listenOnClickYesBtn();
      });
    }

    function showConfirmPage() {
      confirmPage.id = "delete-all-attributes";
      confirmPage.querySelector(".confirm-msg").textContent = DeleteAllAttrBtnView.confirmMessage;
      confirmPage.style.display = "block";
    }

    function listenOnClickYesBtn() {
      var yesBtn = document.querySelector("#delete-all-attributes .yes");
      yesBtn.addEventListener("click", function () {
        clickAllDeleteAttrBtn();
        ConfirmView.reset();
      });
    }

    function clickAllDeleteAttrBtn() {
      while (1) {
        var deleteAttrBtn = document.querySelector(".delete-attribute-control-item-btn");

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