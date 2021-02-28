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
        
        const attrs = ResultParser.getAttrsOfView(scanResult.data.Items, describeResult.data.Table.KeySchema, describeResult.data.Table.AttributeDefinitions);
        
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
    
    static async deleteItem(params) {
        const parsedParams = InputParser.getDeleteParams(params);
        const result = await this.callModelFunc(parsedParams, FuncNames.deleteItem);

        return result;
    }
    
    static async updateItem(params) {
        const parsedParams = InputParser.getUpdateParams(params);
        const result = await this.callModelFunc(parsedParams, FuncNames.updateItem);

        return result;
    }
    
    static async addItem(params) {
        const parsedParams = InputParser.getAddParams(params);
        const result = await this.callModelFunc(parsedParams, FuncNames.addItem);

        return result;
    }
    
    static async removeAttr(params) {
        const parsedParams = InputParser.getRemoveAttrParams(params);
        const result = await this.callModelFunc(parsedParams, FuncNames.updateItem);

        return result;
    }
}

const FuncNames = {
    list: "list",
    describe: "describe",
    scan: "scan",
    deleteItem: "deleteItem",
    updateItem: "updateItem",
    addItem: "addItem"
}

export {
    TableController
}