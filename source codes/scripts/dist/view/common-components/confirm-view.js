"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var confirmView, confirmPage;

  function ConfirmView() {}

  function getConfirmView() {
    return document.querySelector(".confirm-container");
  }

  function getConfirmPage() {
    return getConfirmView().querySelector(".confirm-page");
  }

  function listenOnClickWindow() {
    window.addEventListener("click", function (e) {
      if (e.target == confirmPage) {
        ConfirmView.reset();
      }
    });
  }

  function removeAllChildsExceptConfirmMsg() {
    removeElemByTagName("button");
    removeElemByTagName("textarea");
  }

  function removeElemByTagName(tagName) {
    var elems = Array.from(confirmPage.querySelectorAll(tagName));
    elems.forEach(function (elem) {
      return elem.remove();
    });
  }

  function hide(elem) {
    elem.style.display = "none";
  }

  function removeId(elem) {
    elem.id = "";
  }

  function removeAllBtn() {
    var allBtn = Array.from(confirmPage.querySelectorAll("button"));
    allBtn.forEach(function (btn) {
      return btn.remove();
    });
  }

  function create(id, confirmMsg) {
    ConfirmView.reset();
    confirmView.id = id;
    confirmView.querySelector(".confirm-msg").textContent = confirmMsg;
    confirmView.style.display = "block";
  }

  function createYesAndNoBtn() {
    var yesBtn = getBtnWithClassName("Yes");
    confirmPage.appendChild(yesBtn);
    var noBtn = getBtnWithClassName("No");
    confirmPage.appendChild(noBtn);
    listenOnNoBtn();
  }

  function getBtnWithClassName(text) {
    var btn = document.createElement("button");
    btn.className = text.toLowerCase();
    btn.textContent = text;
    return btn;
  }

  function listenOnNoBtn() {
    var noBtn = confirmView.querySelector("button.no");
    noBtn.addEventListener("click", function () {
      ConfirmView.reset();
    });
  }

  function createInfoTextArea(infoText) {
    var textArea = document.createElement("textarea");
    textArea.textContent = infoText;
    textArea.readOnly = true;
    textArea.rows = "20";
    textArea.cols = "60";
    confirmPage.appendChild(textArea);
  }

  function createOkBtn() {
    var okBtn = getBtnWithClassName("OK");
    confirmPage.appendChild(okBtn);
    listenOnClickOkBtn();
  }

  function listenOnClickOkBtn() {
    var btn = confirmPage.querySelector("button.ok");
    btn.addEventListener("click", ConfirmView.reset);
  }

  function createCopyBtn() {
    var copyBtn = getBtnWithClassName("Copy");
    confirmPage.appendChild(copyBtn);
    listenOnClickCopyBtn();
  }

  function listenOnClickCopyBtn() {
    var btn = confirmPage.querySelector("button.copy");
    btn.addEventListener("click", copyText);
  }

  function copyText() {
    var textArea = confirmPage.querySelector("textarea");
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

  _export("ConfirmView", ConfirmView);

  return {
    setters: [],
    execute: function () {
      confirmView = getConfirmView();
      confirmPage = getConfirmPage();

      ConfirmView.addEventListeners = function () {
        listenOnClickWindow();
      };

      ConfirmView.reset = function () {
        removeAllChildsExceptConfirmMsg();
        hide(confirmView);
        removeId(confirmView);
      };

      ConfirmView.createWithYesAndNoBtn = function (id, confirmMsg) {
        create(id, confirmMsg);
        createYesAndNoBtn();
      };

      ConfirmView.createWithInfo = function (id, confirmMsg, infoText) {
        create(id, confirmMsg);
        createInfoTextArea(infoText);
        createOkBtn();
        createCopyBtn();
      };
    }
  };
});