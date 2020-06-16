import { TableModel } from "../model/table-model.js";

class TableController {
    static async getAllTableNames() {
        const params = {};
        const result = await this.callModelFunc(params, FuncNames.list);
        const tableNames = result.data.TableNames;
        
        return tableNames;
    }
    
    static async getAllAttrs(tableName) {
        const params = { TableName: tableName };
        const result = await this.callModelFunc(params, FuncNames.describe);
        const attrs = result.data.Table.AttributeDefinitions.map(def => def.AttributeName);
        
        return attrs;
    }
    
    static callModelFunc(params, func) {
        const result = TableModel[func](params);
        if(result.err) { throw err; }
        return result;
    }
}

const FuncNames = {
    list: "list",
    describe: "describe"
}

export {
    TableController
}