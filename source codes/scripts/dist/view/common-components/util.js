"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function Util() {}

  _export("Util", Util);

  return {
    setters: [],
    execute: function () {
      Util.showOrHideElement = function (elem) {
        var display = Util.getComputedPropertyValue(elem, "display");

        if (display == "none") {
          elem.style.display = "block";
        } else {
          elem.style.display = "none";
        }
      };

      Util.getComputedPropertyValue = function (elem, property) {
        return window.getComputedStyle(elem).getPropertyValue(property);
      };

      Util.changeIElem = function (iElem) {
        var classDown = "fa-caret-down";
        var classUp = "fa-caret-up";

        if (iElem.classList.contains(classDown)) {
          iElem.classList.remove(classDown);
          iElem.classList.add(classUp);
        } else if (iElem.classList.contains(classUp)) {
          iElem.classList.remove(classUp);
          iElem.classList.add(classDown);
        }
      };

      Util.toggleClasses = function (elem, twoClasses) {
        var class1 = twoClasses[0];
        var class2 = twoClasses[1];

        if (elem.classList.contains(class1)) {
          elem.classList.remove(class1);
          elem.classList.add(class2);
        } else if (elem.classList.contains(class2)) {
          elem.classList.remove(class2);
          elem.classList.add(class1);
        }
      };

      Util.getDistinctValues = function (ary) {
        var distinctValues = ary.reduce(function (result, item) {
          if (!result.includes(item)) {
            result.push(item);
          }

          return result;
        }, []);
        return distinctValues;
      };
    }
  };
});