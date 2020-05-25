"use strict";

System.register(["../common-components/util.js", "../common-components/icon-elem.js"], function (_export, _context) {
  "use strict";

  var Util, IconElem;

  function CollapsibleView() {}

  function getInitIconDoc() {
    var icon = IconElem.get(IconElem.elem.DOWN);
    return icon;
  }

  function toggleContentsMaxHeight(contents) {
    if (contents.style.maxHeight) {
      contents.style.maxHeight = null;
    } else {
      //contents.style.maxHeight = contents.scrollHeight + "px";
      contents.style.maxHeight = "50vh";
      contents.style.overflow = "auto";
    }
  }

  function toggleIconByContentsMaxHeight(icon, maxHeight) {
    icon.className = IconElem.elem.BASIC;

    if (maxHeight) {
      icon.classList.add(IconElem.elem.UP);
    } else {
      icon.classList.add(IconElem.elem.DOWN);
    }

    return icon.className;
  }

  _export("CollapsibleView", CollapsibleView);

  return {
    setters: [function (_commonComponentsUtilJs) {
      Util = _commonComponentsUtilJs.Util;
    }, function (_commonComponentsIconElemJs) {
      IconElem = _commonComponentsIconElemJs.IconElem;
    }],
    execute: function () {
      CollapsibleView.className = {
        collapsible: "collapsible",
        btn: "collapsible-btn",
        contents: "collapsible-contents"
      };

      CollapsibleView.getCollapsibleDoc = function () {
        var btn = CollapsibleView.getBtnDoc();
        var contents = CollapsibleView.getContentsDoc();
        var collapsible = document.createElement("div");
        collapsible.className = CollapsibleView.className.collapsible;
        collapsible.appendChild(btn);
        collapsible.appendChild(contents);
        return collapsible;
      };

      CollapsibleView.getBtnDoc = function () {
        var icon = getInitIconDoc();
        var btn = document.createElement("button");
        btn.className = CollapsibleView.className.btn;
        btn.append(icon);
        return btn;
      };

      CollapsibleView.getContentsDoc = function () {
        var contents = document.createElement("div");
        contents.className = CollapsibleView.className.contents;
        return contents;
      };

      CollapsibleView.listenOnClickBtn = function (collapsible) {
        var btn = collapsible.querySelector("." + CollapsibleView.className.btn);
        var contents = collapsible.querySelector("." + CollapsibleView.className.contents);
        btn.addEventListener("click", function () {
          toggleContentsMaxHeight(contents);
          toggleIconByContentsMaxHeight(btn.querySelector("i"), contents.style.maxHeight);
        });
      };
    }
  };
});