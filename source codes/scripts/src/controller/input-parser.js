import { CommonVar } from "./common-var.js";

class InputParser {
    /*
        input:
            tableName =>
                "TestTable"
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            [
                {
                    Key: {
                        "A": {
                            S: "A1"
                        },
                        "B": {
                            N: "100"
                        }
                    },
                    TableName: "TestTable",
                    ExpressionAttributeNames: {
                        "#name0": "C",
                        "#name1": "D"
                    },
                    ExpressionAttributeValues: {
                        ":value0": { BOOL: true },
                        ":value1": { "S": "Test" }
                    },
                    ConditionExpression: 
                        "#name0 = :value0 AND #name1 = :value1",
                    ReturnConsumedCapacity:
                        "TOTAL"
                }
            ]
    */
    static getDeleteParams(tableName, attrDefs, attrCondition) {
        const Key = this.getKeyOfDeleteParams(attrDefs, attrCondition);
        
        const TableName = tableName;
        
        const [ExpressionAttributeNames, ExpressionAttributeValues] = this.getExpAttrNamesAndValuesOfDeleteParams(attrDefs, attrCondition);
        
        const ConditionExpression = this.getCondExp(Object.keys(ExpressionAttributeNames).length);
        
        const ReturnConsumedCapacity = "TOTAL";
        
        const params = {
            Key,
            TableName,
            ExpressionAttributeNames,
            ExpressionAttributeValues,
            ConditionExpression,
            ReturnConsumedCapacity
        };
        
        return params;
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            Key: {
                "A": {
                    S: "A1"
                },
                "B": {
                    N: "100"
                }
            }
    */
    static getKeyOfDeleteParams(attrDefs, attrCondition) {
        const keyAttrDefs = this.getKeyAttrDefs(attrDefs);
        const key = keyAttrDefs.reduce((acc, cond) => {
            const name = cond.name;
            const type = cond.type;
            const value = this.getMappedValue(attrCondition[name], type);
            acc[name] = {
                [type]: value
            };
            return acc;
        }, {});
        
        return key;
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
        output:
            [
                { name: "A", type: "S", keyType: "HASH" },
                { name: "B", type: "N", keyType: "RANGE" }
            ]
    */
    static getKeyAttrDefs(attrDefs) {
        return attrDefs.filter(attrDef => attrDef.keyType != KEY_TYPE.NON_KEY);
    }
    
    static getMappedValue(value, type) {
        switch(type) {
            case "BOOL":
                if(typeof value === "string") {
                    const v = value.toUpperCase();
                    if(v === "Y" || v === "TRUE"){
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                return value;
                break;
            default:
                return value;
        }
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            [
                ExpressionAttributeNames: {
                    "#name0": "C",
                    "#name1": "D"
                },
                ExpressionAttributeValues: {
                    ":value0": { "BOOL": true },
                    ":value1": { "S": "Test" }
                }
            ]
    */
    static getExpAttrNamesAndValuesOfDeleteParams(attrDefs, attrCondition) {
        const nonKeyAttrDefs = this.getNonKeyAttrDefs(attrDefs);
        
        const ExpressionAttributeNames = nonKeyAttrDefs.reduce((acc, attrDef, index) => {
            acc["#name"+index.toString()] = attrDef.name;
            return acc;
        }, {});
        
        const ExpressionAttributeValues = nonKeyAttrDefs.reduce((acc, attrDef, index) => {
            const name = attrDef.name;
            const value = attrCondition[name];
            const type = attrDef.type;
            acc[":value"+index.toString()] = { [type]: this.getMappedValue(value, type) };
            return acc;
        }, {});
        
        return [ExpressionAttributeNames, ExpressionAttributeValues];
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
        output:
            [
                { name: "C", type: "BOOL", keyType: "NON-KEY" },
                { name: "D", type: "S", keyType: "NON-KEY" }
            ]
    */
    static getNonKeyAttrDefs(attrDefs) {
        return attrDefs.filter(attrDef => attrDef.keyType === KEY_TYPE.NON_KEY);
    }
    
    /*
        input:
            num => 3
        output:
            "#name0 = :value0 AND #name1 = :value1 AND #name2 = :value2"
    */
    static getCondExp(num) {
        let exp = "";
        for(let i=0; i<num; i++) {
            if(i > 0) {
                exp += " AND ";
            }
            exp += `#name${i.toString()} = :value${i.toString()}`;
        }
        
        return exp;
    }
}

const KEY_TYPE = CommonVar.KEY_TYPE;

export {
    InputParser
}