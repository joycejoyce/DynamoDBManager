"use strict";

System.register(["../table-processors/table-processor.js", "../constants/html-properties.js", "../constants/db-info.js"], function (_export, _context) {
  "use strict";

  var TableProcessor, PROCESS, HTML_CLASS, HTML_ID, HTML_PROPERTY, EVENT, TABLE_NAME;

  function EventHandler() {
    this.addEventHandlers = function () {
      console.log("Enter addEventHandlers()");
      addClickEventHandlerOnCreateTblButton();
      addClickEventHandlerOnDeleteTblButton();
      addEventHandlersForQuerying();
      console.log("Exit addEventHandlers()");
    };

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
      HTML_PROPERTY = _constantsHtmlPropertiesJs.HTML_PROPERTY;
      EVENT = _constantsHtmlPropertiesJs.EVENT;
    }, function (_constantsDbInfoJs) {
      TABLE_NAME = _constantsDbInfoJs.TABLE_NAME;
    }],
    execute: function () {}
  };
});