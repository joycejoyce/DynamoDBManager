"use strict";

System.register(["../common-components/confirm-view.js", "./attr-ctrl-item-view.js"], function (_export, _context) {
  "use strict";

  var ConfirmView, AttrCtrlItemView;

  function DeleteAllAttrBtnView() {
    var CONFIRM_PAGE_CONTENTS = {
      id: "delete-all-attr-ctrl-items",
      msg: "Are you sure you want to delete all attributes?"
    };

    this.addEventListeners = function () {
      listenOnClick();
    };

    function listenOnClick() {
      var btn = document.getElementById("delete-all-attr-ctrl-item-btn");
      btn.addEventListener("click", function () {
        ConfirmView.createWithYesAndNoBtn(CONFIRM_PAGE_CONTENTS.id, CONFIRM_PAGE_CONTENTS.msg);
        listenOnClickYesBtn();
      });
    }

    function listenOnClickYesBtn() {
      var yesBtn = document.querySelector("#" + CONFIRM_PAGE_CONTENTS.id + " .yes");
      yesBtn.addEventListener("click", function () {
        removeAllAttrCtrlItemElems();
        ConfirmView.reset();
        DeleteAllAttrBtnView.disableBtn();
        new AttrCtrlItemView().createAnItem();
      });
    }

    function removeAllAttrCtrlItemElems() {
      var elems = Array.from(document.querySelectorAll(".attr-ctrl-item"));
      elems.forEach(function (elem) {
        return elem.remove();
      });
    }
  }

  _export("DeleteAllAttrBtnView", DeleteAllAttrBtnView);

  return {
    setters: [function (_commonComponentsConfirmViewJs) {
      ConfirmView = _commonComponentsConfirmViewJs.ConfirmView;
    }, function (_attrCtrlItemViewJs) {
      AttrCtrlItemView = _attrCtrlItemViewJs.AttrCtrlItemView;
    }],
    execute: function () {
      DeleteAllAttrBtnView.disableBtn = function () {
        var btn = document.getElementById("delete-all-attr-ctrl-item-btn");
        btn.disabled = true;
      };
    }
  };
});