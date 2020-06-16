import { TableItemModel } from "../model/table-item-model.js";

class TableItemController {
    static async queryAllItems(tableName) {
        const params = {
            TableName: tableName,
            ReturnConsumedCapacity: "TOTAL"
        };
        const result = await TableItemModel.scan(params);
        
        if(result.err) {
            throw err;
        }

        return result.data.Items;
    }
}

export {
    TableItemController
}