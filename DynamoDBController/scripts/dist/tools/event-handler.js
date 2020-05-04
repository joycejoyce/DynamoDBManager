"use strict";

System.register(["../table-processors/table-processor.js", "../constants/html-properties.js", "../constants/db-info.js"], function (_export, _context) {
  "use strict";

  var TableProcessor, PROCESS, HTML_CLASS, HTML_ID, HTML_TAG, HTML_PROPERTY, EVENT, CSS_PROPERTY, CSS_VALUE, TABLE_NAME;

  function EventHandler() {
    this.addEventHandlers = function () {
      addClickEventOnChooseTblBtn();
      addKeyupEventOnSearchTblInput();
      addClickEventOnTblName(); //console.log("Enter addEventHandlers()");

      /*addClickEventHandlerOnCreateTblButton();
      addClickEventHandlerOnDeleteTblButton();
      addEventHandlersForQuerying();*/
      //console.log("Exit addEventHandlers()");
    };

    function addClickEventOnChooseTblBtn() {
      $("#".concat(HTML_ID.chooseTblBtn)).on(EVENT.click, function () {
        $(document).find("#".concat(HTML_ID.tblNameDropdown)).toggle();
      });
    }

    function addKeyupEventOnSearchTblInput() {
      $("#".concat(HTML_ID.searchTblInput)).on(EVENT.keyup, function (evt) {
        var _this = $(evt.target);

        var filter = _this.val().toUpperCase();

        var tblNameElems = getTblNameElems();
        $.each(tblNameElems, function (index, elem) {
          var txtValue = $(elem).text().toUpperCase();

          if (txtValue.indexOf(filter) > -1) {
            $(elem).css(CSS_PROPERTY.display, "");
          } else {
            $(elem).css(CSS_PROPERTY.display, CSS_VALUE.none);
          }
        });
      });
    }

    function getTblNameElems() {
      var dropDownElem = $("#".concat(HTML_ID.tblNameDropdown));
      var aElems = $(dropDownElem).find("".concat(HTML_TAG.a));
      return aElems;
    }

    function addClickEventOnTblName() {
      $("#".concat(HTML_ID.tblNameDropdown)).find(".".concat(HTML_CLASS.tblName)).on(EVENT.click, function (evt) {
        var _this = $(evt.target);

        var tblName = _this.text();

        console.log("tblName = ".concat(tblName));
        $("#".concat(HTML_ID.searchTblInput)).val(tblName);
        var tblNameElems = getTblNameElems();
        $.each(tblNameElems, function (index, elem) {
          $(elem).css(CSS_PROPERTY.display, CSS_VALUE.none);
        });
      });
    }

    function addClickEventHandlerOnCreateTblButton() {
      $(document).find("button[id$=\"-tbl-create-btn\"]").on(EVENT.click, function () {
        var tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
        var processor = new TableProcessor(tableName, PROCESS.create).getProcessor();
        processor.process();
      });
    }

    function addClickEventHandlerOnDeleteTblButton() {
      $(document).find("button[id$=\"-tbl-delete-btn\"]").on(EVENT.click, function () {
        var tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
        var processor = new TableProcessor(tableName, PROCESS["delete"]).getProcessor();
        processor.process();
      });
    }

    function addEventHandlersForQuerying() {
      addClickEventHandlerOnQueryTableName(); //addSubmitEventHandlerOnQuerySubmitButton();
    }

    function addClickEventHandlerOnQueryTableName() {
      //$(document).find(`a[id^="query-table-"]`).on(
      $("#query-table-track").on(EVENT.click, function () {
        var tableName = $(this).prop(HTML_PROPERTY.id).split("-").pop();
        var processor = new TableProcessor(tableName, PROCESS.query).getProcessor();
        processor.showQueryFields();
      });
    }
    /*function addSubmitEventHandlerOnQuerySubmitButton() {
        $(document).find(`form[class="${HTML_CLASS.queryForm}"]`).on(
            EVENT.submit,
            function(evt) {
                evt.preventDefault();
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
                const queryCondition = getQueryCondition(tableName, $(this));
                /*const processor = new TableProcessor(tableName, PROCESS.query).getProcessor();
                processor.showQueryFields();
            }
        );
    }
    
    function getQueryCondition(tableName, dom) {
        
    }*/

  }

  _export("EventHandler", EventHandler);

  return {
    setters: [function (_tableProcessorsTableProcessorJs) {
      TableProcessor = _tableProcessorsTableProcessorJs.TableProcessor;
      PROCESS = _tableProcessorsTableProcessorJs.PROCESS;
    }, function (_constantsHtmlPropertiesJs) {
      HTML_CLASS = _constantsHtmlPropertiesJs.HTML_CLASS;
      HTML_ID = _constantsHtmlPropertiesJs.HTML_ID;
      HTML_TAG = _constantsHtmlPropertiesJs.HTML_TAG;
      HTML_PROPERTY = _constantsHtmlPropertiesJs.HTML_PROPERTY;
      EVENT = _constantsHtmlPropertiesJs.EVENT;
      CSS_PROPERTY = _constantsHtmlPropertiesJs.CSS_PROPERTY;
      CSS_VALUE = _constantsHtmlPropertiesJs.CSS_VALUE;
    }, function (_constantsDbInfoJs) {
      TABLE_NAME = _constantsDbInfoJs.TABLE_NAME;
    }],
    execute: function () {}
  };
});