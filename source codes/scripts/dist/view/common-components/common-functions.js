"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function CommonFunctions() {
    this.showOrHideElement = function (elem) {
      var display = window.getComputedStyle(elem).getPropertyValue("display");

      if (display == "none") {
        elem.style.display = "block";
      } else {
        elem.style.display = "none";
      }
    };

    this.getDistinctValues = function (ary) {
      var distinctValues = ary.reduce(function (result, item) {
        if (!result.includes(item)) {
          result.push(item);
        }

        return result;
      }, []);
      return distinctValues;
    };
  }

  _export("CommonFunctions", CommonFunctions);

  return {
    setters: [],
    execute: function () {}
  };
});