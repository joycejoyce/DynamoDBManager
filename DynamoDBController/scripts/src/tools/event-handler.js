import {TableProcessor, PROCESS} from "../table-processors/table-processor.js";
import {HTML_CLASS, HTML_ID, HTML_PROPERTY, EVENT} from "../constants/html-properties.js";
import {TABLE_NAME} from "../constants/db-info.js";

function EventHandler() {
    this.addEventHandlers = function() {
        console.log("Enter addEventHandlers()");
        addClickEventHandlerOnCreateTblButton();
        addClickEventHandlerOnDeleteTblButton();
        addEventHandlersForQuerying();
        console.log("Exit addEventHandlers()");
    }
    
    function addClickEventHandlerOnCreateTblButton() {
        $(document).find(`button[id$="-tbl-create-btn"]`).on(
            EVENT.click,
            function() {
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
                const processor = new TableProcessor(tableName, PROCESS.create).getProcessor();
                processor.process();
            }
        );
    }
    
    function addClickEventHandlerOnDeleteTblButton() {
        $(document).find(`button[id$="-tbl-delete-btn"]`).on(
            EVENT.click,
            function() {
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-")[0];
                const processor = new TableProcessor(tableName, PROCESS.delete).getProcessor();
                processor.process();
            }
        );
    }
    
    function addEventHandlersForQuerying() {
        addClickEventHandlerOnQueryTableName();
        //addSubmitEventHandlerOnQuerySubmitButton();
    }
    
    function addClickEventHandlerOnQueryTableName() {
        //$(document).find(`a[id^="query-table-"]`).on(
        $("#query-table-track").on(
            EVENT.click,
            function() {
                const tableName = $(this).prop(HTML_PROPERTY.id).split("-").pop();
                const processor = new TableProcessor(tableName, PROCESS.query).getProcessor();
                processor.showQueryFields();
            }
        );
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

export {
    EventHandler
};