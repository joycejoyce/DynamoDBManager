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
            const attrType = getAttrTypes(elem);
            result.push({AttributeName: attrName, AttributeType: attrType});
            return result;
        }, []);
        
        return inputs;
    }
    
    function getAttrCtrlItemElems() {
        return Array.from(document.getElementsByClassName("attr-ctrl-item"));
    }
    
    function getAttrTypes(attrCtrlItemElem) {
        const type = attrCtrlItemElem.querySelector(".dropdown-btn").value;
        switch(type) {
            case "string":
                return "S";
            case "number":
                return "N";
            case "boolean":
                return "B"
            default:
                throw `Unkown type: [${type}]`;
        }
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