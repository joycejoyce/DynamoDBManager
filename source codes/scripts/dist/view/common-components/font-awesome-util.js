"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function FontAwesomeUtil() {
    this.createElements = function () {
      var addAttrBtn = document.querySelector("#add-attr-ctrl-item-btn");
      addAttrBtn.appendChild(FontAwesomeUtil.getPlusSign());
    };
  }

  _export("FontAwesomeUtil", FontAwesomeUtil);

  return {
    setters: [],
    execute: function () {
      FontAwesomeUtil.getPlusSign = function () {
        var elem = document.createElement("i");
        elem.className = "fa fa-plus";
        return elem;
      };
    }
  };
});