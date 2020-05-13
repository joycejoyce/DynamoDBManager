"use strict";

System.register(["../confirm-page-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmPageView;

  function DeleteAllAttrBtnView() {
    this.addEventListeners = function () {
      listenOnClick();
    };

    function listenOnClick() {
      var btn = document.getElementById("delete-all-attributes-btn");
      btn.addEventListener("click", setupConfirmPage);
    }

    function setupConfirmPage() {
      var info = {
        id: "confirm-delete-all-attributes",
        msg: "Are you sure you want to delete all attributes?",
        action: clickAllDeleteAttrBtns
      };
      var confirmPage = new ConfirmPageView();
      confirmPage.setPageInfo(info);
      confirmPage.show();
      var confirmContainer = document.getElementsByClassName("confirm-container")[0];
      var confirmMsg = "Are you sure you want to delete all attributes?";
      confirmContainer.getElementsByClassName("confirm-msg")[0].textContent = confirmMsg;
      confirmContainer.id = id;
      confirmContainer.style.display = "block";
    }

    function listenOnClickConfirmBtns() {
      listenOnYesBtn();
      listenOnNoBtn();
    }

    function listenOnYesBtn() {
      var btn = document.querySelector("#" + id + ">.yes");
      btn.addEventListener("click", clickAllDeleteAttrBtns);
    }

    function listenOnNoBtn() {}
  }

  _export("DeleteAllAttrBtnView", DeleteAllAttrBtnView);

  return {
    setters: [function (_confirmPageViewJs) {
      ConfirmPageView = _confirmPageViewJs.ConfirmPageView;
    }],
    execute: function () {}
  };
});