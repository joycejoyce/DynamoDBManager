import {HTML_CLASS, CSS_PROPERTY, CSS_VALUE} from "../constants/html-properties.js"

function TableQuery(tableName) {
    this.showQueryFields = function() {
        $(document).find("."+HTML_CLASS.queryForm).css(CSS_PROPERTY.display, CSS_VALUE.none);
        const id = getHtmlIdToShowQueryForm();
        $(document).find("#"+id).css(CSS_PROPERTY.display, CSS_VALUE.block);
    }
    
    function getHtmlIdToShowQueryForm() {
        const POSTFIX = "-table-query-form";
        return tableName + POSTFIX;
    }
}

export {
    TableQuery
};