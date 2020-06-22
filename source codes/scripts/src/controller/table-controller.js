import { TableModel } from "../model/table-model.js";
import { ResultParser } from "./result-parser.js";

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
        /*const params = { TableName: tableName };
        const result = await this.callModelFunc(params, FuncNames.describe);
        const attrNameTypeMap = ResultParser.getAttrNameTypeMap(result.data.Table.AttributeDefinitions);*/
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
    
    static callModelFunc(params, func) {
        const result = TableModel[func](params);
        if(result.err) { throw err; }
        return result;
    }
}

const FuncNames = {
    list: "list",
    describe: "describe",
    scan: "scan"
}

export {
    TableController
}