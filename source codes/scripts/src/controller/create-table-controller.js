import {CreateTableModel} from "../model/create-table-model.js";

function CreateTableController() {
    let tableName;
    let attrDefs;
    let keySchema;
    let provisionedThroughput;
    
    this.transformViewInputForModel = () => {
        const input = getInputs();
        new CreateTableModel().createTable(input);
    };
    
    function getInputs() {
        tableName = getTableNameInput();
        keySchema = getKeySchema();
        attrDefs = getAttrDefs();
        provisionedThroughput = getProvisionedThroughput();
        
        const input = {
            TableName: tableName,
            KeySchema: keySchema,
            AttributeDefinitions: attrDefs,
            ProvisionedThroughput: provisionedThroughput
        };
        console.log("input", input);
        
        return input;
    }
    
    function getTableNameInput() {
        const tableNameInput = document.getElementById("table-name-input");
        const tableName = tableNameInput.value;
        return tableName;
    }
    
    function getAttrDefs() {
        const elems = getAttrCtrlItemElems();　
        let inputs = elems.reduce((result, elem) => {
            const attrName = elem.querySelector(".attr-name-input").value;
            const attrType = elem.querySelector(".attribute-type-btn").value;
            result.push({AttributeName: attrName, AttributeType: attrType});
            return result;
        }, []);
        
        return inputs;
    }
    
    function getAttrCtrlItemElems() {
        return Array.from(document.getElementsByClassName("attribute-control-item"));
    }
    
    function getKeySchema() {
        const keySchema = [
            {
                AttributeName: document.querySelector("#hash-key-row .dropdown-btn").value,
                KeyType: "HASH"
            },
            {
                AttributeName: document.querySelector("#range-key-row .dropdown-btn").value,
                KeyType: "RANGE"
            }
        ];
        
        return keySchema;
    }
    
    function getProvisionedThroughput() {
        const provisionedThroughput = {
            ReadCapacityUnits: document.getElementById("read-capacity-units").value,
            WriteCapacityUnits: document.getElementById("write-capacity-units").value
        };
        
        return provisionedThroughput;
    }
}

export {
    CreateTableController
};