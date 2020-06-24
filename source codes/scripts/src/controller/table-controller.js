import { TableModel } from "../model/table-model.js";
import { ResultParser } from "./result-parser.js";
import { InputParser } from "./input-parser.js";

class TableController {
    static async getAllTableNames() {
        const params = {};
        const result = await this.callModelFunc(params, FuncNames.list);
        const tableNames = result.data.TableNames;
        
        return tableNames;
    }
    
    static async getAllAttrs(tableName) {
        const scanParams = {
            TableName: tableName,
            ReturnConsumedCapacity: "TOTAL"
        };
        const scanResult = await this.callModelFunc(scanParams, FuncNames.scan);
        
        const describeParams = {
            TableName: tableName
        };
        const describeResult = await this.callModelFunc(describeParams, FuncNames.describe);
        
        const attrs = ResultParser.getAttrsOfView(scanResult.data.Items, describeResult.data.Table.KeySchema);
        
        return attrs;
    }
    
    static async getAttrNameKeyMap(tableName) {
        const params = { TableName: tableName };
        const result = await this.callModelFunc(params, FuncNames.describe);
        const schema = ResultParser.getAttrNameKeyMap(result.data.Table.KeySchema);
        
        return schema;
    }
    
    static async getAllAttrNameTypeMap(tableName) {
        const params = {
            TableName: tableName,
            ReturnConsumedCapacity: "TOTAL"
        };
        const result = await this.callModelFunc(params, FuncNames.scan);
        const attrNameTypeMap = ResultParser.getAttrNameTypeMap(result.data.Items);
        
        return attrNameTypeMap;
    }
    
    static async getAllItems(tableName) {
        const params = {
            TableName: tableName,
            ReturnConsumedCapacity: "TOTAL"
        };
        const result = await this.callModelFunc(params, FuncNames.scan);
        const items = ResultParser.getItemsOfView(result.data.Items);

        return items;
    }
    
    static async callModelFunc(params, func) {
        const result = await TableModel[func](params);
        if(result.err !== null) {
            throw result.err;
        }
        
        return result;
    }
    
    static async deleteItem(tableName, attrDefs, attrCondition) {
        const params = InputParser.getDeleteParams(tableName, attrDefs, attrCondition);
        const result = await this.callModelFunc(params, FuncNames.deleteItem);

        return result;
    }
}

const FuncNames = {
    list: "list",
    describe: "describe",
    scan: "scan",
    deleteItem: "deleteItem"
}

export {
    TableController
}