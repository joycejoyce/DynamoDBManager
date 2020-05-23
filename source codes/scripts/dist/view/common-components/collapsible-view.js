"use strict";

System.register(["../common-components/util.js"], function (_export, _context) {
  "use strict";

  var Util, CLASS_NAME, I_ELEM_CLASS_NAME;

  function CollapsibleView() {}

  function getBtnDoc() {
    var iElem = getInitIElemDoc();
    var btn = document.createElement("button");
    btn.className = CLASS_NAME.btn;
    btn.append(iElem);
    return btn;
  }

  function getInitIElemDoc() {
    var iElem = document.createElement("i");
    iElem.className = I_ELEM_CLASS_NAME.down;
    return iElem;
  }

  function getContentsDoc() {
    var contents = document.createElement("div");
    contents.className = CLASS_NAME.contents;
    return contents;
  }

  function getCollapsibleDoc() {
    var collapsible = document.createElement("div");
    collapsible.className = CLASS_NAME.collapsible;
    return collapsible;
  }

  function showOrHideContents(collapsible) {
    var contents = collapsible.querySelector(CLASS_NAME.contents);
    var overflow = Util.getComputedPropertyValue(contents, "overflow");
  }

  function getIElem() {}

  _export("CollapsibleView", CollapsibleView);

  return {
    setters: [function (_commonComponentsUtilJs) {
      Util = _commonComponentsUtilJs.Util;
    }],
    execute: function () {
      CLASS_NAME = {
        collapsible: "collapsible",
        btn: "collapsible-btn",
        contents: "collapsible-btn"
      };
      I_ELEM_CLASS_NAME = {
        up: "fas fa-plus",
        down: "fas fa-minus"
      };

      CollapsibleView.createDoc = function () {
        var btn = getCollapsibleBtn();
        var contents = getCollapsibleContents();
        var collapsible = getCollapsibleDoc();
        collapsible.appendChild(btn);
        collapsible.appendChild(contents);
        return collapsible;
      };

      CollapsibleView.listenOnClickBtn = function (collapsible) {
        var btn = collapsible.querySelector(CLASS_NAME.btn);
        var contents = collapsible.querySelector(CLASS_NAME.contents);
        btn.addEventListener("click", function () {
          showOrHideContents(collapsible);
          Util.toggleClasses(contents);
        });
      };
    }
  };
});