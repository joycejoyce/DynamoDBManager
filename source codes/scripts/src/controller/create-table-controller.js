import {DEFAULT_TYPE_TEXT, ATTR_TYPES} from "../view/create-table-view/attr-ctrl-item-view.js";

function CreateTableController() {
    let tableName;
    let attrDefs;
    let keySchema;
    let provisionedThroughput;
    
    this.transformViewInputForModel = () => {
        checkInputs();
        getInputs();
    };
    
    function getInputs() {
        tableName = getTableNameInput();
        attrDefs = getAttrDefs();
        keySchema = getKeySchema();
        provisionedThroughput = getProvisionedThroughput();
        console.log("tableName", tableName);
        console.log("attrDefs", attrDefs);
        console.log("keySchema", keySchema);
        console.log("provisionedThroughput", provisionedThroughput);
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
            const attrType = elem.querySelector(".attribute-type-btn").textContent;
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
                AttributeName: document.querySelector("#hash-key-dropdown>.dropdown-btn").textContent,
                KeyType: "HASH"
            },
            {
                AttributeName: document.querySelector("#range-key-dropdown>.dropdown-btn").textContent,
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
    
    function checkInputs() {
        checkAttrDefs();
    }
    
    function checkAttrDefs() {
        const elems = getAttrTypeBtnElems();
        elems.forEach((elem) => {
            const pattern = Object.values(ATTR_TYPES).reduce((result, type, i) => {
                if(i > 0) {
                    result += "|";
                }
                result += type;
                return result;
            }, "");
            
            const title = "Choose a type";
            
            elem.pattern = pattern;
            elem.title = title;
        });
    }
    
    function getAttrTypeBtnElems() {
        return document.querySelectorAll(".attribute-type-btn");
    }
}

export {
    CreateTableController
};