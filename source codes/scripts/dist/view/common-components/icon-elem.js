"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function IconElem() {}

  function getBasicIElem() {
    var elem = document.createElement("i");
    elem.classList.add(IconElem.elem.BASIC);
    return elem;
  }

  _export("IconElem", IconElem);

  return {
    setters: [],
    execute: function () {
      IconElem.elem = {
        BASIC: "fas",
        UP: "fa-caret-up",
        DOWN: "fa-caret-down",
        PLUS: "fa-plus",
        MINUS: "fa-minus"
      };

      IconElem.get = function (name) {
        var elem = getBasicIElem();
        elem.classList.add(name);
        return elem;
      };
    }
  };
});