"use strict";

System.register(["../constants/html-properties.js"], function (_export, _context) {
  "use strict";

  var HTML_CLASS, CSS_PROPERTY, CSS_VALUE;

  function TableQuery(tableName) {
    this.showQueryFields = function () {
      $(document).find("." + HTML_CLASS.queryForm).css(CSS_PROPERTY.display, CSS_VALUE.none);
      var id = getHtmlIdToShowQueryForm();
      $(document).find("#" + id).css(CSS_PROPERTY.display, CSS_VALUE.block);
    };

    function getHtmlIdToShowQueryForm() {
      var POSTFIX = "-table-query-form";
      return tableName + POSTFIX;
    }
  }

  _export("TableQuery", TableQuery);

  return {
    setters: [function (_constantsHtmlPropertiesJs) {
      HTML_CLASS = _constantsHtmlPropertiesJs.HTML_CLASS;
      CSS_PROPERTY = _constantsHtmlPropertiesJs.CSS_PROPERTY;
      CSS_VALUE = _constantsHtmlPropertiesJs.CSS_VALUE;
    }],
    execute: function () {}
  };
});