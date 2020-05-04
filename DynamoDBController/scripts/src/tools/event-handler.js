import {TableProcessor, PROCESS} from "../table-processors/table-processor.js";
import {HTML_CLASS, HTML_ID, HTML_TAG, HTML_PROPERTY, EVENT, CSS_PROPERTY, CSS_VALUE} from "../constants/html-properties.js";
import {TABLE_NAME} from "../constants/db-info.js";

function EventHandler() {
    this.addEventHandlers = function() {
        addClickEventOnChooseTblBtn();
        addKeyupEventOnSearchTblInput();
        addClickEventOnTblName();
        //console.log("Enter addEventHandlers()");
        /*addClickEventHandlerOnCreateTblButton();
        addClickEventHandlerOnDeleteTblButton();
        addEventHandlersForQuerying();*/
        //console.log("Exit addEventHandlers()");
    }
    
    function addClickEventOnChooseTblBtn() {
        $(`#${HTML_ID.chooseTblBtn}`).on(
            EVENT.click,
            () => {
                $(document).find(`#${HTML_ID.tblNameDropdown}`).toggle();
            }
        );
    }
    
    function addKeyupEventOnSearchTblInput() {
        $(`#${HTML_ID.searchTblInput}`).on(
            EVENT.keyup,
            (evt) => {
                const _this = $(evt.target);
                const filter = _this.val().toUpperCase();
                const tblNameElems = getTblNameElems();
                $.each(tblNameElems, (index, elem) => {
                    const txtValue = $(elem).text().toUpperCase();
                    if(txtValue.indexOf(filter) > -1) {
                        $(elem).css(CSS_PROPERTY.display, "");
                    }
                    else {
                        $(elem).css(CSS_PROPERTY.display, CSS_VALUE.none);
                    }
                });
            }
        );
    }
    
    function getTblNameElems() {
        const dropDownElem = $(`#${HTML_ID.tblNameDropdown}`);
        const aElems = $(dropDownElem).find(`${HTML_TAG.a}`);
        return aElems;
    }
    
    function addClickEventOnTblName() {
        $(`#${HTML_ID.tblNameDropdown}`).find(`.${HTML_CLASS.tblName}`).on(
            EVENT.click,
            (evt) => {
                const _this = $(evt.target);
                const tblName = _this.text();
                console.log(`tblName = ${tblName}`);
                $(`#${HTML_ID.searchTblInput}`).val(tblName);
                const tblNameElems = getTblNameElems();
                $.each(tblNameElems, (index, elem) => {
                    $(elem).css(CSS_PROPERTY.display, CSS_VALUE.none);
                });
            }
        )
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