import {TABLE_NAME} from "../constants/db-info.js";
import {TableCreator} from "./table-creator.js";
import {TableDeleter} from "./table-deleter.js";
import {TableQuery} from "./table-query.js";

function TableProcessor(tableName, process) {
    this.getProcessor = function() {
        switch(process) {
            case PROCESS.create:
                return new TableCreator(tableName);
                break;
            case PROCESS.delete:
                return new TableDeleter(tableName);
                break;
            case PROCESS.query:
                return new TableQuery(tableName);
                break;
            default:
                throw `Unexpected process [${process}]`;
                break;
        }
    };
}

const PROCESS = {
    create: "create",
    delete: "delete",
    query: "query"
};

export {
    TableProcessor,
    PROCESS
};